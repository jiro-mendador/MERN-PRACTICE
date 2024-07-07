import mysql from "mysql";

// * creating connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "i@mgr00t",
  // * if database is available u can include the property here
  database: "nodesampdb",
});

// * creating table
con.connect(function (err) {
  if (err) throw err;
  console.log("CONNECTED");

  con.query(
    "CREATE TABLE IF NOT EXISTS type(id INT AUTO_INCREMENT PRIMARY KEY,type VARCHAR(100))",
    function (err) {
      if (err) throw err;
      console.log("TABLE CREATED!");
    }
  );

  con.query(
    "CREATE TABLE IF NOT EXISTS customers(name VARCHAR(255), address VARCHAR(255), type_id INT, FOREIGN KEY(type_id) REFERENCES type(id))",
    function (err) {
      if (err) throw err;
      console.log("TABLE CREATED!");
    }
  );

  // * altering table for adding column if the table exists
  con.query(
    "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY",
    function (err) {
      if (err) throw err;
      console.log("TABLE ALTERED!");
    }
  );
});
