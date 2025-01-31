const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const mysql = require("mysql2");

const app = express();
const userRoute = require("./routes/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// Create a connection to the database
const conn = mysql.createConnection({
  host: "db_container",
  port: 3306,
  user: "root",
  password: "root",
  database: "db_siteecom",
});

// Connect to the database
conn.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL Database!");
});

app.get("/", (req, res) => {
  res.render("login", { name: "Samuel" });
});

app.post("/login", (req, res) => {
  res.redirect("/login");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  conn.query(
    "INSERT INTO t_users (username, hashedPassword, salt) VALUES (?, ?, ?)", // à expliquer dans le rapport, protège contre les injections SQL et s'appelle "prepared statement"
    [username, hash, "7fefbdfj"],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.redirect("/login");
    }
  );
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
