const express = require("express");
const path = require("path");
const app = express();
const PORT = 4000;

app.use(express.json());

// import routers
const userRouter = require(path.join(__dirname, "routes", "user.js"));

app.use(userRouter);

app.listen(PORT, () =>
  console.log("Server is running on http://localhost:4000")
);
