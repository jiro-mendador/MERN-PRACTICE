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
  let sql = "DROP TABLE IF EXISTS customers";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE DELETED!");
    console.log(result); //* if exists result obj warning count = 0, =1 when !exists
  });
  sql = "DROP TABLE IF EXISTS type";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE DELETED!");
    console.log(result); //* if exists result obj warning count = 0, =1 when !exists
  });
});
