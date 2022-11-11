const router = require("express").Router();
const path = require("path");

// import controllers

const orderController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "order.js"
));

router.get("/orders/:userId", orderController.GET);
router.post("/orders", orderController.POST);

module.exports = router;
