const fs = require("fs");
const path = require("path");

const users = JSON.parse(
  fs
    .readFileSync(path.join(process.cwd(), "database", "user.json"), "UTF-8")
    .trim() || "[]"
);

const GET = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(users);
};

const POST = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { username, phoneNumber } = req.body;

  if (!username || !phoneNumber) {
    res.status(400).json({
      message: "username and phoneNumber required!",
      status: 400,
    });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    username,
    phone_number: phoneNumber,
  };

  users.push(newUser);

  fs.writeFileSync(
    path.join(process.cwd(), "database", "user.json"),
    JSON.stringify(users, null, 2)
  );

  res.status(201).json({
    message: "New user created!",
    status: 201,
  });
};

module.exports = {
  GET,
  POST,
};
