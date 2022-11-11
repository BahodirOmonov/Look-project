const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "front")));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(process.cwd(), "front", "index.html"));
});

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
