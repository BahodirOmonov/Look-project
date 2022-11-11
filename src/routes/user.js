const router = require("express").Router();
const path = require("path");

// import controllers

const userController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "user.js"
));

router.get("/users", userController.GET);
router.post("/users", userController.POST);

module.exports = router;
