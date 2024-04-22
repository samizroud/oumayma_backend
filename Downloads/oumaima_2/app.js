const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const app = express();





//------------ROUTES----------------
const userRouter = require("./routes/userRouter");
const assignmentRouter = require("./routes/assignmentRouter");
const submissionRouter = require("./routes/submissionRouter");
const profileRouter = require("./routes/profileRouter");
const candidatureRouter = require("./routes/condidatureRouter");
const feedbackRouter = require("./routes/feedbackRouter");
const offrestageRouter = require("./routes/offrestageRouter");
const cvRouter = require("./routes/cvRouter");
const projetRouter = require("./routes/projetRouter");
const educationRouter = require("./routes/educationRouter");
const experienceRouter = require("./routes/experienceRouter");
const certificationRouter = require("./routes/certificationRouter");
const skillRouter = require("./routes/skillRouter");
const tacheRouter = require("./routes/tacheRouter");
const labRouter = require("./routes/labRouter");
//const rapportRouter = require("./routes/rapportRouter");
const attestationRouter = require("./routes/attestationRouter");
//------------------------------
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// 1) MIDDLEWARES
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP , please try again in an hour !",
});
app.use("/api", limiter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// 3) ROUTES

app.use("/api/v1/users", userRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/submissions", submissionRouter);
app.use("/api/v1/profiles", profileRouter);
app.use("/api/v1/candidatures", candidatureRouter);
app.use("/api/v1/feedbacks", feedbackRouter);
app.use("/api/v1/offrestages", offrestageRouter);
app.use("/api/v1/cvs", cvRouter);
app.use("/api/v1/projets", projetRouter);
app.use("/api/v1/educations", educationRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/certifications", certificationRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/taches", tacheRouter);
app.use("/api/v1/labs", labRouter);
//app.use("/api/v1/rapports", rapportRouter);
app.use("/api/v1/attestations", attestationRouter);




app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
