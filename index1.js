var express = require("express");
var app = express();

app.use(express.json());

/* ---------------- Basic Routes ---------------- */

app.get("/", (req, res) => {
  res.send("Hello from API");
});

app.get("/time", (req, res) => {
  const time = new Date().toLocaleTimeString();
  res.send(`Time is: ${time}`);
});

app.get("/date", (req, res) => {
  const date = new Date().toLocaleDateString();
  res.send(`Date is: ${date}`);
});

app.get("/wishes/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}`);
});

app.get("/square/:n", (req, res) => {
  const n = Number(req.params.n);
  res.send(`Square of ${n} is: ${n * n}`);
});

app.get("/addition/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send(`Add of ${a} and ${b} is: ${a + b}`);
});

/* ---------------- CRUD Example ---------------- */

let users = [
  { id: 1, name: "Ali", age: 25 },
  { id: 2, name: "Sara", age: 22 }
];

// Create User
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  users.push(newUser);
  res.send(newUser);
});

// Get All Users
app.get("/users", (req, res) => {
  res.send(users);
});

// Get User by ID
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

// Update User
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name;
  user.age = req.body.age;

  res.send(user);
});

// Delete User
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.send("User deleted");
});

/* ---------------- Start Server ---------------- */

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
