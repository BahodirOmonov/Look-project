const host = "http://192.168.1.79:4000";

async function renderUsers() {
  const list = document.querySelector(".customers-list");
  const response = await fetch(host + "/users");
  const users = await response.json();

  list.innerHTML = null;
  for (let user of users) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const a = document.createElement("a");

    li.className = "customer-item";
    span.className = "customer-name";
    a.className = "customer-phone";

    span.textContent = user.username;
    a.textContent = user.phone_number;

    li.append(span, a);
    list.append(li);

    li.addEventListener("click", async (event) => {
      const client = document.querySelector("#clientId");
      const userHeader = document.querySelector("#userHeader");
      client.textContent = user.id;
      userHeader.textContent = user.username;

      window.localStorage.setItem("userId", user.id + "");

      renderOrders(user.id);
    });
  }
}

async function renderOrders(userId) {
  const orderList = document.querySelector(".orders-list");
  orderList.innerHTML = null;
  const response = await fetch(host + "/orders/" + userId);
  const userOrders = await response.json();
  for (let order of userOrders) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const div = document.createElement("div");
    const span = document.createElement("span");
    const span2 = document.createElement("span");

    li.className = "order-item";
    img.src = order.food.img;
    span.className = "order-name";
    span2.className = "order-count";

    span.textContent = order.food.name;
    span2.textContent = order.count;

    div.append(span, span2);
    li.append(img, div);
    orderList.append(li);
  }
}

async function renderFoods() {
  const select = document.querySelector("#foodsSelect");
  const response = await fetch(host + "/foods");
  const foods = await response.json();
  select.innerHTML = null;
  for (let food of foods) {
    const option = document.createElement("option");

    option.value = food.id;
    option.setAttribute("name", food.name);

    option.textContent = food.name;

    select.append(option);
  }
}

const userForm = document.querySelector("#userAdd");
const usernameInput = document.querySelector("#usernameInput");
const phoneInput = document.querySelector("#telephoneInput");

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const response = await fetch(host + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameInput.value,
      phoneNumber: phoneInput.value,
    }),
  });

  usernameInput.value = null;
  phoneInput.value = null;

  renderUsers();
});

const foodsForm = document.querySelector("#foodsForm");
const foodsSelect = document.querySelector("#foodsSelect");
const foodsCount = document.querySelector("#foodsCount");

foodsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newOrder = {
    userId: +window.localStorage.getItem("userId"),
    foodId: +foodsSelect.value,
    count: +foodsCount.value,
  };

  const response = await fetch(host + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder, null, 2),
  });

  foodsCount.value = null;
  renderOrders(+window.localStorage.getItem("userId"));
});

renderUsers();
renderFoods();
