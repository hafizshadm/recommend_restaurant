const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const resData = require("../util/restaurants-data");

router.get("/recommend", (req, res) => {
  res.render("recommend");
});

router.post("/recommend", (req, res) => {
  const restaurant = req.body;

  restaurant.id = uuid.v4();
  const restaurantsData = resData.getStoredRestaurants();

  restaurantsData.push(restaurant);

  // writing data in JSON
  const storedRestaurants = JSON.stringify(restaurantsData);

  // writing data in file
  resData.storeRestaurants(storedRestaurants);
  res.redirect("/confirm");
});

router.get("/confirm", (req, res) => {
  res.render("confirm");
});

router.get("/restaurants", (req, res) => {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  if (order === "desc") {
    nextOrder = "asc";
  }

  const restaurantsData = resData.getStoredRestaurants();
  restaurantsData.sort((resA, resB) => {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });
  res.render("restaurants", {
    numberOfRestaurants: restaurantsData.length,
    restaurants: restaurantsData,
    nextOrder: nextOrder,
  });
});

router.get("/restaurant/:id", (req, res) => {
  const restaurantId = req.params.id;

  const restaurantsData = resData.getStoredRestaurants();

  for (const restaurant of restaurantsData) {
    if (restaurant.id === restaurantId) {
      res.render("restaurant-details", { restaurant: restaurant });
    }
    return;
  }
  res.render("404");
});

module.exports = router;
