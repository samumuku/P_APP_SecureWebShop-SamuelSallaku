const crypto = require("crypto");
const conn = require("../models/conn");
const privateKey = require("../auth/private_key.js");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    const { username, password } = req.body;
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .createHash("sha256")
      .update(password + salt)
      .digest("hex");
    conn.query(
      "INSERT INTO t_users (username, hashedPassword, salt) VALUES (?, ?, ?)",
      [username, hash, salt],
      (err, results) => {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).send("User already exists");
          return;
        }
        res.redirect("/login");
      }
    );
  },

  login: (req, res) => {
    const { username, password } = req.body;
    conn.query(
      "SELECT salt FROM t_users WHERE username = ?",
      [username],
      (err, results) => {
        if (err) {
          console.error("Error getting data:", err);
          res.status(500).send("Internal Server Error");
          return;
        }
        if (results.length === 0) {
          res.send("Invalid username or password");
          return;
        }
        const salt = results[0].salt;
        const hash = crypto
          .createHash("sha256")
          .update(password + salt)
          .digest("hex");
        conn.query(
          "SELECT * FROM t_users WHERE username = ? AND hashedPassword = ?",
          [username, hash],
          (err, results) => {
            if (err) {
              console.error("Error querying data:", err);
              res.status(500).send("Internal Server Error");
              return;
            }
            if (results.length > 0) {
              const token = jwt.sign({ username }, privateKey, {
                expiresIn: "1y",
              });
              // Send the token to the client
              res.json({ message: "Login successful", token });
            } else {
              res.send("Invalid username or password");
            }
          }
        );
      }
    );
  },

  logout: (req, res) => {
    res.redirect("/login");
  },
};
