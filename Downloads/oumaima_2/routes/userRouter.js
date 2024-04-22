
const express = require("express");
const authController = require("../controllers/authController");
const uploadd = require("../utils/upload");
const router = express.Router();

// Inscription (Sign Up)
router.route("/signup").post(uploadd.uploadPicture, authController.signUp);

// Connexion (Login)
router.route("/login").post(authController.login);

// Oubli de mot de passe (Forgot Password)
router.route("/forgot-password").post(authController.forgotPassword);

// Réinitialisation de mot de passe - Première étape (Reset Password Step One)
router.route("/reset-password-step-one").post(authController.resetPasswordStepOne);

// Réinitialisation de mot de passe - Deuxième étape (Reset Password Step Two)
router.route("/reset-password-step-two").post(authController.resetPasswordStepTwo);

// Changement de mot de passe (Update User Password)
router.route("/change-password").patch(authController.protect, authController.updateUserPassword);



module.exports = router;
