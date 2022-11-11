const fs = require("fs");
const path = require("path");

const orders = JSON.parse(
  fs
    .readFileSync(path.join(process.cwd(), "database", "order.json"), "UTF-8")
    .trim() || "[]"
);

const GET = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { userId } = req.params;

  if (!userId || +userId != userId) {
    return res.status(400).json({
      message: "userId invalid!",
      status: 400,
    });
  }

  const findOrders = orders.filter((order) => order.userId == userId);
  res.status(200).json(findOrders);
};

const POST = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const { userId, foodId, count } = req.body;
  if (!userId || !foodId || !count) {
    return res.status(400).json({
      message: "userId, foodId and count required!",
      status: 400,
    });
  }

  const findOrder = orders.find(
    (order) => order.userId == userId && order.foodId == foodId
  );

  if (findOrder) {
    findOrder.count += count;
    fs.writeFileSync(
      path.join(process.cwd(), "database", "order.json"),
      JSON.stringify(orders, null, 2)
    );

    return res.status(200).json({
      message: "Count is updated!",
      status: 200,
    });
  }

  const newOrder = {
    id: orders.length ? orders[orders.length - 1].id + 1 : 1,
    userId,
    foodId,
    count,
  };

  orders.push(newOrder);

  fs.writeFileSync(
    path.join(process.cwd(), "database", "order.json"),
    JSON.stringify(orders, null, 2)
  );

  return res.status(201).json({
    message: "New order created!",
    status: 201,
  });
};

module.exports = {
  GET,
  POST,
};
