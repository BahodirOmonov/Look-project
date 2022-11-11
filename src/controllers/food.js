const fs = require("fs");
const path = require("path");

const foods = JSON.parse(
  fs
    .readFileSync(path.join(process.cwd(), "database", "food.json"), "UTF-8")
    .trim() || "[]"
);

const GET = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(foods);
};

module.exports = {
  GET,
};
