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
  // ! NOTE!!! : for ORDER BY u can't replace them as ? instead put it directly in the sql
  let ordByUpDown = ["id", "DESC"]; // * used to reverse the order of result
  let sql = `SELECT * FROM customers ORDER BY ${ordByUpDown[0]} ${ordByUpDown[1]}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(
      "ORDER BY " + ordByUpDown[0] + " " + ordByUpDown[1] + " : ",
      result
    );
  });
});
