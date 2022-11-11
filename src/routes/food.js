const router = require("express").Router();
const path = require("path");

// import controllers

const foodController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "food.js"
));

router.get("/foods", foodController.GET);

module.exports = router;
