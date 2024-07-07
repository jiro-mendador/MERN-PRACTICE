var http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("FROM INTRO TO NODE.JS");
  })
  .listen(3000);

// * this makes your computer a server and listen to port 8080
// * when you go to localhost:8080 you will see "Hello World" in the browser
// ! idk it is now working

// * example of including a module from other file
// * ./ is important to indicate same folder
// * from modules.js file
var dateTimeModule = require("./modules.js");
console.log(dateTimeModule.myDateTime());
