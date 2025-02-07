const mysql = require("mysql2");

// Create a connection to the database
const conn = mysql.createPool({
  host: "db_container",
  port: 3306,
  user: "root",
  password: "root",
  database: "db_siteecom",
});

// Connect to the database
conn.getConnection((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

module.exports = conn;
