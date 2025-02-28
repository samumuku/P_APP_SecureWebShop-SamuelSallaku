const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("./controllers/UserController");
const isAuthenticated = require("./auth/auth.js");
const cookies = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookies());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/register", UserController.register);

app.post("/login", UserController.login);

app.get("/logout", UserController.logout);

app.get("/register", (req, res) => {
  res.render("register");
});

// Protect the home route
app.get("/home", isAuthenticated, (req, res) => {
  res.render("home", { user: req.user });
});

app.get("/login", (req, res) => {
  res.render("login");
});

// Démarrage du serveur
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
