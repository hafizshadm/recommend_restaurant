const fs = require("fs");
const path = require("path");

const restaurantDataFilePath = path.join(
  __dirname,
  "..",
  "data",
  "restaurants.json"
);

function getStoredRestaurants() {
  // reading data in a file
  const fileData = fs.readFileSync(restaurantDataFilePath);
  // parsing data to JSON
  const restaurantsData = JSON.parse(fileData);

  return restaurantsData;
}

function storeRestaurants(storableRestaurants) {
  // writing data in file
  fs.writeFileSync(restaurantDataFilePath, storableRestaurants);
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
