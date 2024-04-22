const { promisify } = require("util");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
//-----------------------------------------

exports.restrictTo = (...roles) => {
  // AUTHORIZATION
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You dont have permission to do this action !! "),
        403
      );
    }
    next();
  };
};
//----------------------------
const signToken = function (id,role) {
  const token = jwt.sign(
    { id,role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  return token;
};

const generateRefreshToken = (userId,roleUser) => {
  const refreshToken = jwt.sign(
    { id: userId ,role:roleUser},
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
    }
  );
  return refreshToken;
};
//---------------------------------------------
const createSendToken = (user, statuscode, res, refreshToken, next) => {
  try {
  const token = signToken(user._id,user.role);
  console.log('Token:', token); 
  const refreshToken = generateRefreshToken(user._id,user.role);
  console.log('Refresh Token:', refreshToken);
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
  res.status(statuscode).json({
    status: "success",
    token,
    refreshToken,
    data: { user },
  });
 } catch (error) {
    return next(new AppError("Error creating token", 500));
 }
};

//----------- Sign Up ---------------------

exports.signUp = catchAsync(async (req, res, next) => {
  let newAccount = null;

  if (!req.body.email || !req.body.password || !req.body.username) {
    return next(
      new AppError(
        "Veuillez saisir votre e-mail, mot de passe, prénom et nom !",
        400
      )
    );
  }

  newAccount = await User.findOne({ email: req.body.email });
  if (newAccount) {
    return next(new AppError("Cet e-mail est déjà utilisé !", 400));
  }
  if (req.file) req.body.profilePicture = req.file.filename;
  newAccount = await User.create({
    profilePicture: req.body.profilePicture,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    role: req.body.role ?? "user",
  });

  newAccount.save({ validateBeforeSave: false });
  res.status(201).json({
    status: "success",
    message: "Account created successfully !",
  });
});

// ----------------------- Activate Account ---------------------

//-----------------------------------------
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return next(new AppError("Veuillez fournir votre email et mot de passe", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  
  if (!user) {
    return next(new AppError("Email ou mot de passe incorrect", 400));
  }

  const passwordCorrect = await user.correctPassword(password, user.password);

  if (!passwordCorrect) {
    return next(new AppError("Email ou mot de passe incorrect", 400));
  }

  console.log("Login successful!");

  const refreshToken = generateRefreshToken(user._id,user.role);
  user.refreshToken = refreshToken;
  await user.save();

  // Créer et envoyer le token JWT
  createSendToken(user, 200, res);
});

//-----------------------------------------
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "Vous n'êtes pas connecté ! Veuillez vous connecter pour accéder à cette route.",
        401
      )
    );
  }

  // Vérifier si le token est valide
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Vérifier si l'utilisateur existe toujours en base de données
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("L'utilisateur n'existe plus !", 401));
  }

  // Vérification réussie, autoriser l'accès à la route
  req.user = currentUser;
  next();
});


//---------------------------  Forgot Password -----------------------------
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1 - get the email from the client and verify if it exist or not
  const email = req.body.email;
  const account = await User.findOne({ email });
  if (!account) {
    return next(
      new AppError("Il n'y a pas d'utilisateur avec cette adresse e-mail", 400)
    );
  }
  // 2 - generate a token with which the password is gonna reset :
  const resetCode = account.createPasswordResetCode();
  account.save({ validateBeforeSave: false });
  // 3 - send the token to the client to use it and reset his password :
  const message = `Bonjour,\n
  Vous avez oublié votre mot de passe ?\n
  Voici votre code de reinitialization : \n    ${resetCode}
   `;
  try {
    await sendEmail({
      email: account.email,
      subject: "Code de réinitialisation de mot de passe (Valable 30 minutes) ",
      message,
    });
    res.status(200).json({
      status: "success",
      message:
        "Votre code de réinitialisation de l'e-mail a été envoyé avec succès ",
    });
  } catch (err) {
    account.passwordResetExpires = undefined;
    account.passwordResetCode = undefined;
    account.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "Une erreur s'est produite lors de l'envoi de l'e-mail ! Merci d'essayer plus tard .",
        500
      )
    );
  }
});
//------------------------------------
exports.resetPasswordStepOne = catchAsync(async (req, res, next) => {
  //verify if the token passed in the URL is valid and correct or no :
  const account = await User.findOne({
    passwordResetCode: req.body.passwordResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!account) {
    return next(new AppError("Le Code est invalide ou a expiré !! "), 400);
  }

  res.status(200).json({
    status: "success",
  });
});
//----------------------------------------
exports.resetPasswordStepTwo = catchAsync(async (req, res, next) => {
  const account = await User.findOne({
    passwordResetCode: req.body.passwordResetCode,
  });

  if (!account) {
    return next(new AppError("Le Code est invalide ou a expiré !! "), 404);
  }
  if (
    req.body.password === null ||
    req.body.passwordConfirm === null ||
    req.body.password === "" ||
    req.body.passwordConfirm === ""
  ) {
    return next(
      new AppError(
        "Veuillez saisir votre mot de passe et confirmer votre mot de passe !"
      ),
      400
    );
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(
      new AppError(
        "Les mots de passe ne correspondent pas ! veuillez saisir les mêmes mots de passe !"
      ),
      400
    );
  }

  account.password = req.body.password;
  account.passwordConfirm = req.body.passwordConfirm;
  account.passwordResetCode = undefined;
  account.passwordResetExpires = undefined;
  account.save({ validateBeforeSave: false });
  // -- Modify the passwordModifyAt propertie
  // loged the user In :
  createSendToken(account, 200, res);
});
//------------------------------------
exports.updateUserPassword = catchAsync(async (req, res, next) => {
  const account = await User.findOne({
    _id: req.user.id,
  }).select("+password");
  if (
    !(await account.correctPassword(req.body.oldPassword, account.password))
  ) {
    return next(
      new AppError(
        "vous devez entrer votre ancien mot de passe correctement !! ",
        400
      )
    );
  }

  if (account.correctPassword(req.body.newPassword, account.password)) {
    return next(
      new AppError(
        "Saisir une autre mot de passe differnt de votre ancien mot de passe ! "
      ),
      400
    );
  }

  if (req.body.newPassword !== req.body.newPasswordConfirm) {
    return next(
      new AppError(
        "Les mots de passe ne correspondent pas ! veuillez confirmer votre mot de passe !"
      ),
      400
    );
  }

  account.password = req.body.newPassword;
  account.passwordConfirm = req.body.newPasswordConfirm;
  await account.save();
  try {
    await sendEmail({
      email: account.email,
      subject: "mot de passe modifié",
      message: "Votre mot de passe est modifié ",
    });

    createSendToken(account, 200, res);
  } catch (err) {
    console.log(err.message);
  }
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return next(new AppError("Aucun jeton de rafraîchissement fourni", 400));
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== refreshToken) {
    return next(new AppError("Jeton de rafraîchissement invalide", 401));
  }

  const newAccessToken = signToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
});
