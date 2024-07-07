// * nodejs can be used for db apps
// * first u need to install mysql driver
// * using npm (mysql)

import mysql from "mysql";

// * creating connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "i@mgr00t",
});

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected");
// });

// * query database
con.connect(function (err) {
  if (err) throw err;
  let sql = `SELECT * FROM rpos_db.products`;
  con.query(sql, function (err, result) {
    if (err) throw err;

    // * getting result as object returns all available
    // * result is an array that has object with props as db cols with value as db cell value
    console.log("Result", result);

    // * getting 1 row specific data
    console.log("Result", result[0].product_name);

    // * getting all row for specific data
    for (let rs of result) {
      console.log(rs["product_name"]);
    }
  });
});