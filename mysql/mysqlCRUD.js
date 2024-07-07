import mysql from "mysql";
import http from "http";
import qs from "querystring";

// * creating connection
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "i@mgr00t",
  database: "nodesampdb",
  connectionLimit: 10, // Adjust according to your needs
});

http
  .createServer(function (req, res) {
    if (req.method === "POST") {
      // * to know which button is clicked u need to parse data
      let data = "";
      // * getting data
      req.on("data", function (chunkOfData) {
        data += chunkOfData;
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (data.length > 1e6) {
          // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
          req.socket.destroy();
        }
      });

      req.on("end", function () {
        // * parsing form-data to access it
        const POST = qs.parse(data);

        // * form fields
        // formData.[enter the name on the input] || using the OR is there's no input
        const name = POST.customerName;
        const address = POST.customerAddress;
        const type = POST.type;

        // * to know which button is set or clicked use if else
        // ! NOTE USE input.trim() !== ""  TO CHECK IF THERE'S A VALUE ON AN INPUT
        if (name.trim() !== "" && address.trim() !== "" && type.trim() !== "") {
          if (POST.insert) {
            res.write("action is INSERT " + name + " " + address + " " + type);
            insertData({ name, address, type });
          }
          if (POST.id.trim() !== "" && POST.update) {
            res.write(
              `action is UPDATE ${POST.id} ` + name + " " + address + " " + type
            );
            let id = POST.id;
            updateData({ name, address, type, id });
          }
        } else if (POST.id.trim() !== "" && POST.delete) {
          res.write("action is DELETE " + POST.id);
          let id = POST.id;
          deleteData({ id });
        } else {
          res.writeHead(302, {
            Location: "/", // Redirect to the input page
          });
          return res.end();
        }
        return res.end();
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });

      // * since loadData needs a callback func when the selection finished
      loadData(function (err, data) {
        if (err) {
          console.error("Error loading data:", err);
          return res.end();
        }
        let html = `
              <h1>MYSQL CRUD USING NODE.JS</h1>
              <form
                method="POST"
                enctype="application/x-www-form-urlencoded"
              >
                <input type="text" name="customerName" placeholder="Customer Name"><br>
                <input  type="text" name="customerAddress" placeholder="Customer Address"><br>
                <label for="type">Customer Type:</label>
                <select name="type">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select><br>
                <input type="submit" name="insert" value="INSERT"><br><br><br><br>
                
                <input name="id" placeholder="Customer ID to delete/update"><br>
                <input type="submit" name="update" value="UPDATE"><br>
                <input type="submit" name="delete" value="DELETE"><br>
              </form>`;
        html += data;
        res.write(html);
        return res.end();
      });
    }
  })
  .listen(8080);

// * we are using connection pooling here to handle multiple connections and releasing it right after using
function insertData(data) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log("CONNECTED!");
    const sql =
      "INSERT INTO customers (name, address, type_id) VALUES (?, ?, ?)";
    connection.query(sql, [data.name, data.address, data.type], function (err) {
      connection.release(); // Release the connection back to the pool
      if (err) throw err;
      console.log("INSERT SUCCESS!");
    });
  });
}

function updateData(data) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log("CONNECTED!");
    const sql =
      "UPDATE customers SET name = ?, address = ?, type_id = ? WHERE id = ?";
    connection.query(
      sql,
      [data.name, data.address, data.type, data.id],
      function (err, result) {
        connection.release(); // Release the connection back to the pool
        if (err) throw err;
        console.log("UPDATE SUCCESS!");
        console.log("Records updated : ", result.affectedRows);
      }
    );
  });
}

function deleteData(data) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log("CONNECTED!");
    const sql = "DELETE FROM customers WHERE id = ?";
    connection.query(sql, [data.id], function (err, result) {
      connection.release(); // Release the connection back to the pool
      if (err) throw err;
      console.log("DELETE SUCCESS!");
      console.log("Records deleted : ", result.affectedRows);
    });
  });
}

// * this needs a callback func when the selection is finished
// * just like async functions
function loadData(load) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log("CONNECTED!");
    const sql = "SELECT * FROM customers";
    connection.query(sql, function (err, result) {
      connection.release(); // Release the connection back to the pool
      if (err) {
        load(err, null);
        return;
      }
      let html = `<h3>Customers Table</h3>
        <table>
        <tr>
          <th>NAME</th>
          <th>ADDRESS</th>
          <th>TYPE_ID</th>
          <th>ID</th>
        </tr>  
      `;
      for (let rs of result) {
        html += `<tr>
                    <td>${rs.name}</td>
                    <td>${rs.address}</td>
                    <td>${rs.type_id}</td>
                    <td>${rs.id}</td>
                  </tr>`;
      }
      html += `</table><br><br>`;
      load(null, html);
    });
  });
}
