import mysql from "mysql";

// * creating connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "i@mgr00t",
  // * if database is available u can include the property here
  database: "nodesampdb",
});

con.connect(function (err) {
  if (err) throw err;
  let sql =
    "SELECT name, address, type FROM customers c JOIN type t ON c.type_id = t.id";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("JOINED TABLE RESULT : s", result);
  });

  // * left join to get all the customers even if they have no type
  sql =
    "SELECT name, address, type FROM customers c LEFT JOIN type t ON c.type_id = t.id";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("LEFT JOIN TABLE RESULT : s", result);
  });

  // * right join to get all the type even if there's no customer for it
  sql =
    "SELECT name, address, type FROM customers c RIGHT JOIN type t ON c.type_id = t.id";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("RIGHT JOIN TABLE RESULT : s", result);
  });
});