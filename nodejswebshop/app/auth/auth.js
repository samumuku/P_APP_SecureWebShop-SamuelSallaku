const privateKey = require("./private_key.js");
const jwt = require("jsonwebtoken");

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
    next();
  });
};

exports.isAuth = isAuth;
exports.isAdminAuth = isAdminAuth;
