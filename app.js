require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDb = require("./db/connect");
const PORT = process.env.PORT || 5001;
const notFound = require("./middlewares/notfound");
const errorHandlerMiddleware = require("./middlewares/errorhandler");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const path = require("path");
const auth = require("./middlewares/authenticate");

//  security
app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "https://localhost:5001"],
  })
);
app.use(xss());
// rate Limiter

// middleware
// serves all the static assets that the client-side application needs
app.use(express.static(path.resolve(__dirname, "./client-mine/dist")));
// app.use(express.static("./client/build"));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

// ensures that the index.html file is served for all routes that haven't been matched by any other route handlers. Together, these two lines of code enable a typical client-side application to function properly when deployed on a server
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client-mine/dist", "index.html"));
  // res.sendFile(path.resolve(__dirname, "/client/build", "index.html"));
});
app.get("/", (req, res) => {
  res.send("this is the home pages");
});
// error handlers
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// Using path.resolve() ensures that the correct path is used regardless of the current working directory, and can be helpful when deploying an application to a remote server or other environments where the file structure may differ.

// Using a relative path like ./client/build assumes that the current working directory is the root directory of your application, and may not work correctly if the working directory is changed or if the application is deployed to a different environment.

// In general, it is recommended to use path.resolve() to create an absolute path when serving static files, as it provides more reliable and consistent behavior.
