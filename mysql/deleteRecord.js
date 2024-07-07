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
  let sql = "DELETE FROM customers WHERE name = 'Jiro Mendador' and id != 1";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("NUMBER OF RECORDS DELETED : ", result.affectedRows);
  });
});
