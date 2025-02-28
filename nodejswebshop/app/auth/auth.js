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

const isAdminAuth = () => {};

(module.exports = isAuth), isAdminAuth;
