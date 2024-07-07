import http from "http";
import fs from "fs";

const server = http.createServer(function (req, res) {
  let path = "./routing/views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    // * redirects
    case "/about.me":
      res.writeHead(301, { Location: "/about" });
      res.end();
      break;
    default:
      path += "error.html";
      break;
  }

  fs.readFile(path, function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
});

server.listen(8080, function () {
  console.log("SERVER IS RUNNING...");
});

/**
 * * STATUS CODES
 * * 100 range - informational responses
 * * 200 range - success codes
 * * 300 range - codes for redirects
 * * 400 range - user or client error codes
 * * 500 range - server error codes
 */

// ! NOTE : LIKE LIVE SERVER FOR HTML AND PHP
// ! THERE IS ANOTHER ONE FOR NODE
// ! CALLED NODEMON, INSTALL GLOBALLY USING NPM
// ! 'npm install -g nodemon'
// ! FOR SOME COMPUTERS U WILL ENCOUNTER THE ERROR
// ! ERROR : nodemon.ps1 cannot be loaded because running scripts is disabled on this system.
// ! SOLUTION : open cmd as admin > powershell -command Set-ExecutionPolicy RemoteSigned

// * NOTE : when the code comes from github and there is no node_modules folder
// * just run npm install and it will install all the project dependencies