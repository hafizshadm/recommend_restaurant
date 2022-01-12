const fs = require("fs");
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

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/recommend", (req, res) => {
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  const restaurantDataFilePath = path.join(
    __dirname,
    "data",
    "restaurants.json"
  );
  // reading data in a file
  const fileData = fs.readFileSync(restaurantDataFilePath);
  // parsing data to JSON
  const restaurantsData = JSON.parse(fileData);
  restaurantsData.push(restaurant);
  // writing data in JSON
  const storedRestaurants = JSON.stringify(restaurantsData);
  // writing data in file
  fs.writeFileSync(restaurantDataFilePath, storedRestaurants);

  res.redirect("/confirm");
});

app.get("/confirm", (req, res) => {
  res.render("confirm");
});

app.get("/restaurants", (req, res) => {
  const restaurantDataFilePath = path.join(
    __dirname,
    "data",
    "restaurants.json"
  );
  // reading data in a file
  const fileData = fs.readFileSync(restaurantDataFilePath);
  // parsing data to JSON
  const restaurantsData = JSON.parse(fileData);
  res.render("restaurants", { numberOfRestaurants: restaurantsData.length });
});

app.listen(3000);
