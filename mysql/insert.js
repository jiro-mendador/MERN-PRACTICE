import mysql from "mysql";

// * creating connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "i@mgr00t",
  // * if database is available u can include the property here
  database: "nodesampdb",
});

// * THE RESULT OBJECT
// * when exec query result obj is returned
/**
 *  * LIKE THIS :
 *  * {
 ** fieldCount: 0,
 ** affectedRows: 14,
 ** insertId: 0,
 ** serverStatus: 2,
 ** warningCount: 0,
 ** message: '\'Records:14  Duplicated: 0  Warnings: 0',
 ** protocol41: true,
 ** changedRows: 0
 ** }
 *
 */

// * data insertion
con.connect(function (err) {
  if (err) throw err;
  console.log("CONNECTED");
  // * 1 data will be inserted
  let sql = "INSERT INTO type (type) VALUES ('VIP'),('Regular'),('Semi')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("3 RECORD INSERTED");
  });

  sql =
    "INSERT INTO customers (name,address, type_id) VALUES ('Jiro Mendador', 'Philippines', '1')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 RECORD INSERTED");

    // * GETTING LAST INSERTED ID
    // * u just need to put another argument in the query callback function
    console.log("LAST INSERTED ID : ", result.insertId);
  });

  // * many data will be inserted
  sql = "INSERT INTO customers (name, address, type_id) VALUES ?";
  let values = [
    ["John", "Taiwan", "2"],
    ["Juan", "France", "3"],
    ["Jenny", "England", "1"],
    ["Jean", "China", "3"],
    ["Johnny", "Caloocan", "2"],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("MULTIPLE RECORD INSERTED!");

    //  * GETTING AFFECTED ROWS
    // * u just need to put another argument in the query callback function
    console.log("AFFECTED ROW COUNT : ", result.affectedRows);
  });
});
