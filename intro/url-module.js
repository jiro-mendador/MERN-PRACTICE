// * built-in url mod - splits up a web address into readable parts.
var url = require("url");

// * url.parse() - parse the url to get the parts
let adr = "http://localhost:8080/intro.js`?fName=Jiro&lName=Mendador";
let query = url.parse(adr, true);

console.log(query.host);
console.log(query.pathname);
console.log(query.search);

let queryData = query.query;
console.log(queryData.fName, queryData.lMonth);

// * combining query string parsing and node.js as file server
var http = require("http");
// var url = require("url"); url is already required at the top
var fs = require("fs");

http
  .createServer((req, res) => {
    let q = url.parse(req.url, true);
    let fileName = "." + q.pathname;
    fs.readFile(fileName, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);  