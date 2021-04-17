const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const hbs = require("hbs");
const chalk = require("chalk");
const path = require("path");
const app = express();

// Databases Connection

mongoose
  .connect("mongodb://localhost/crud-mongo")
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

app.set("port", process.env.PORT | 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("html", require("hbs").__express);

// HBS Partials

hbs.registerPartials(__dirname + "/views/partials");

// Routes

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

// Starting Server
app.listen(app.get("port"), () => {
  console.log(
    chalk.blue.underline(
      `Server running in: http://localhost:${app.get("port")}`
    )
  );
});
