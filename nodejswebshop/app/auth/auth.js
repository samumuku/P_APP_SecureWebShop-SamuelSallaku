const privateKey = require("./private_key.js");
const jwt = require("jsonwebtoken");
const conn = require("../models/conn");

const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }
    req.user = decoded;
    next();
  });
};

const isAdminAuth = (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res.redirect("/home");
    } else if (decoded.role !== "admin") {
      return res.redirect("/home");
    }
    req.user = decoded;

    // Avoir tous les users de la DB
    conn.query("SELECT username, role FROM t_users", (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des utilisateurs:", err);
        return res.status(500).send("Erreur serveur");
      }

      req.users = results; // Ajouter les users à la requête
      next(); // Envoyer la requete à la prochaine fonction ou middleware
    });
  });
};

exports.isAuth = isAuth;
exports.isAdminAuth = isAdminAuth;
