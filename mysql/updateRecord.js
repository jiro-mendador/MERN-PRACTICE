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
  let name = "Juan Dela Cruz";
  let address = "Tondo, Manila";
  con.query(
    "UPDATE customers SET name = ?, address = ? WHERE id = 1;",
    [name, address],
    function (err, result) {
      if (err) throw err;
      console.log("Records updated : ", result.affectedRows);
    }
  );
});