const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const path = require("path");

const express = require("express");
const app = express();

//setting up ejs template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//serving files in public folder to server
app.use(express.static("public"));

//for getting data from a form or a link and use in js
app.use(express.urlencoded({ extended: false }));

//this middleware is use to get routes which are starting with /
app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(500).render("500");
});

app.listen(3000);
