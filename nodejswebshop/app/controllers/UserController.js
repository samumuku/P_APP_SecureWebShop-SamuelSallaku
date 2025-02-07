const crypto = require("crypto");
const conn = require("../models/conn");

module.exports = {
  get: (req, res) => {
    res.send("User: Samuel");
  },

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
          res.status(500).send("Internal Server Error");
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
              res.send("Login successful");
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
