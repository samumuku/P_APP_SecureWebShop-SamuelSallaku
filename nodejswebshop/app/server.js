const express = require("express");

const app = express();
const userRoute = require("./routes/User");
app.use("/user", userRoute);

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "Samuel" });
});

app.post("/login", (req, res) => {
  res.redirect("/login");
});

app.post("/register", (req, res) => {
  res.redirect("/register");
});

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
