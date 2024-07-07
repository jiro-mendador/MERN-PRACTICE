// * module - it is like a js libraries, a set of functions.
// * to include module, use require() func with the name of the module.

// * u can also create modules and include them
// * use exports keyword to make the props and methods avail outside the module file
exports.myDateTime = function () {
  return Date();
};

// * built-in http module
// * allows node to transfer data over the HTTP
// * to use/include it
var http = require("http");
// * this allows the app to access http and create a server
http
  .createServer(function (req, res) {
    // * u can also do it this way for plain texts
    // * res = response, req = request
    // res.write("THIS IS A RESPONSE");
    // res.end(); // * ends it

    // * if the response from http is in HTML, include a header with the correct content-type
    // * 200 (OK) = status code, object containing headers
    res.writeHead(200, { "Content-Type": "text/html" });
    // res.write("<center><h1>YOOOOO FROM NODE.JS BIJJ<h1></center>");
    // res.end();
    // * or direct
    res.end("<center><h1>YOOOOO FROM NODE.JS BIJJ<h1></center>");
  })
  .listen(8081);
// * ctr + c in terminal to stop server

// * when it has a req or a query
// * since we are using url object we should require it
var url = require("url");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    // * simple
    // res.write(req.url);

    // * splitting query string
    let q = url.parse(req.url, true).query;
    let text = `${q.fName} ${q.lName}`;
    res.write(text);

    res.end();
  })
  .listen(8080);