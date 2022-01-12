const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const indexFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(indexFilePath);
});

app.get("/about", (req, res) => {
  const aboutFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(aboutFilePath);
});

app.get("/recommend", (req, res) => {
  const recommendFilePath = path.join(__dirname, "views", "recommend.html");
  res.sendFile(recommendFilePath);
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
  const confirmFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(confirmFilePath);
});

app.get("/restaurants", (req, res) => {
  const restaurantsFilePath = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(restaurantsFilePath);
});

app.listen(3000);
