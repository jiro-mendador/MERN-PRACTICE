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
  // * shorthand - LIMIT 2, 2;
  con.query("SELECT * FROM customers LIMIT 2 OFFSET 2", function (err, result) {
    if (err) throw err;
    console.log("RESULT LIMIT BY 2 ROWS AND SKIP 2 ROWS", result);
  });
});
