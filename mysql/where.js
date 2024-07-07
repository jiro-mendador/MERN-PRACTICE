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
  console.log("CONNECTED!");
  let sql = "SELECT * FROM customers WHERE address = 'China'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });

  // * percent means it starts with that word/letter 'word-%' or ends with that word/letter '%-word'
  sql = "SELECT * FROM customers WHERE name LIKE '%Ji%'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("name like ji", result);
  });

  // * escaping queries - for values specified by the user, prevents sql injection it's like parsing the statement in PHP
  let select = "Caloocan";
  sql = "SELECT * FROM customers WHERE address = " + mysql.escape(select);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("WITH MYSQL ESC : ", result);
  });

  // * u can also replace ? the value u want to escape
  select = "Jiro Mendador";
  let select2 = 17;
  sql = "SELECT * FROM customers WHERE name = ? AND id = ?";
  con.query(sql, [select, select2], function (err, result) {
    console.log("WITH ? AS ESCAPE : ", result);
  });
});