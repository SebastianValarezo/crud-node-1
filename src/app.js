const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const hbs = require("hbs");
const chalk = require("chalk");
const path = require("path");
const app = express();

// Env

require("dotenv").config({ path: "../variables.env" });

// Databases Connection

mongoose
  .connect(process.env.DB_URL)
  .then((db) =>
    console.log(chalk.bgGreen.black.bold("Database successfully connected"))
  )
  .catch((err) =>
    console.log(chalk.bgRed.black.bold("Failed to connect database"))
  );

// Middlewares
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Settings

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "0.0.0.0");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("html", require("hbs").__express);

// HBS Partials

hbs.registerPartials(__dirname + "/views/partials");

// Routes

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

// Starting Server
app.listen(app.get("port"), app.get("host"), () => {
  console.log(
    chalk.blue.underline(
      `Server running in: http://${app.get("host")}:${app.get("port")}`
    )
  );
});
