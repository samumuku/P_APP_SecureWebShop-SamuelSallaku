const mysql = require("mysql2");

// Create a connection to the database
const conn = mysql.createConnection({
  host: "localhost",
  port: 6033,
  user: "root",
  password: "root",
  database: "db_siteecom",
});

// Connect to the database
conn.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");

  // Example query
  conn.query("SELECT * FROM users", (err, results, fields) => {
    if (err) throw err;
    console.log(results);
  });

  // Close the connection
  conn.end();
});
export { conn };
module.exports = conn;
