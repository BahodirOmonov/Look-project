const express = require("express");
const path = require("path");
const app = express();
const PORT = 4000;

app.use(express.json());

// import routers
const userRouter = require(path.join(__dirname, "routes", "user.js"));
const foodRouter = require(path.join(__dirname, "routes", "food.js"));
const orderRouter = require(path.join(__dirname, "routes", "order.js"));

app.use(userRouter);
app.use(foodRouter);
app.use(orderRouter);

app.listen(PORT, () =>
  console.log("Server is running on http://localhost:4000")
);
