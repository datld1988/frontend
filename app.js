const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const express = require("express");
const bodyParser = require("body-parser");

// const Bootstrap = require("node-fw");
const Pinpoint = require("pinpoint-fw");
const { Config } = Pinpoint;

const expressApp = express();

//Body Parser
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));

//CORS
expressApp.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
  next();
});

let Application = new Pinpoint({
  dbSetup: () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(
        Config("database").MONGO_URI,
        // Config("database").MONGO_OPTIONS,
        err => {
          console.log("err: ", err);
          err ? reject(err) : resolve();
        }
      );
    });
  },
  httpServer: expressApp,
  httpPort: Config("app").PORT,
  socketServer: null,
  modules: [
    { endpoint: "/api/guest", path: "/modules/guest" },
    { endpoint: "/api/user", path: "/modules/user" },
    { endpoint: "/api/work", path: "/modules/work" },
    { endpoint: "/api/office", path: "/modules/office" },
    { endpoint: "/api/file", path: "/modules/file" },
    { endpoint: "/api/activity", path: "/modules/activity" }
  ]
});

Application.bootstrap()
  .then(() => {
    console.log(`APPLICATION IS RUNNING ON PORT ${Application.httpPort}`);
    /**
	 * Undefined Error Handler
	 * - unhandledRejection
	 * - uncaughtException
	 */
    process.on("unhandledRejection", error =>
      console.log(
        "-------<unhandledRejection>-------\n\n",
        error.stack,
        "\n\n-------</ unhandledRejection>-------"
      )
    );
    process.on("uncaughtException", error =>
      console.log(
        "-------<uncaughtException>-------\n\n",
        error.stack,
        "\n\n-------</ uncaughtException>-------"
      )
    );
  })
  .catch(err => {
    console.log("APPLICATION BOOTSTRAP ERROR: \n", err);
  });

expressApp.use("/", express.static(__dirname + "/ui/dist"));
expressApp.use("/assets", express.static(__dirname + "/ui/dist/assets"));
expressApp.get("/*", (req, res, next) => {
  if (
    req.originalUrl.startsWith("/api") ||
    req.originalUrl.startsWith("/doc")
  ) {
    next();
  } else {
    res.sendFile(__dirname + "/ui/dist/index.html");
  }
});
