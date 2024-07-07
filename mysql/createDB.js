import mysql from "mysql";

// * creating connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "i@mgr00t",
});

// * CREATING DATABASE
con.connect(function (err) {
  if (err) throw err;
  console.log("CONNECTED");

  con.query("CREATE DATABASE IF NOT EXISTS nodeSampDB", function (err) {
    if (err) throw err;
    console.log("DATABASE CREATED!");
  });
});