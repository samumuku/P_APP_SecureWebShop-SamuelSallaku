const privateKey = require("./private_key.js");
const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.redirect("/login");
  }
  const token = authHeader.split(" ")[1];
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
}

module.exports = isAuthenticated;
