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
  let sql = ["SELECT * FROM customers;", "SELECT name FROM customers;"];
  con.query(sql[1], function (err, result) {
    if (err) throw err;
    console.log(result);

    // * RESULT OBJ is an array which the index is the row number
    // * to get the 3rd row data in the result
    console.log("RESULT 3RD DATA:", result[2].name);
  });

  // * THE FIELDS OBJECT - contains information about each field in the result
  con.query(sql[0], function (err, result, fields) {
    if (err) throw err;
    console.log("fieds info (column) : ", fields);
  });
});