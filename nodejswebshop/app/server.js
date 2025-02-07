const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/User");
const UserController = require("./controllers/UserController");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", UserController.login);

app.post("/register", UserController.register);

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
  if (!res.render("login")) {
    res.status(404).send("Page introuvable. Veuillez vérifier votre URL");
  }
});

// Démarrage du serveur
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
