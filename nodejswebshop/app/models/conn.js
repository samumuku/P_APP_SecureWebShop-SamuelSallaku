const mysql = require("mysql2");

// Creer une connexion a la DB
const conn = mysql.createPool({
  host: "db_container",
  port: 3306,
  user: "root",
  password: "root",
  database: "db_siteecom",
});

// Se connecter a la DB
conn.getConnection((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

module.exports = conn;
