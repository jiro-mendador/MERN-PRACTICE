// * npm - package manager, already installed when node.js is installed
// * package - all the files u need for module.
// * modules - js libs u can include in your proj

// * dl a package using cmd
// * just use npm install "name of package"
// * npm will creates a folder node_modules for packages

// * to use the installed package use require

/**
 * ! IMPORTANT NOTE :
 *
 * ! since the project folder is outside the nodejs root folder
 * ! installed packages and other things will not be available by default
 *
 * ! when installing this upper-case module using npm 'npm install upper-case' this will not work
 * ! it will create a node_module folder in your current root directory
 * ! u need to make it npm i upper-case --save to create a package.json for your project then
 * ! u need to edit that package.json then put "type" : "module" at the top
 * ! then use import instead of require!!! then u're good to go...
 */

import { upperCase } from "upper-case";
console.log(upperCase("this text will be in upper case"));

// ! NOTE : when using import for http dont use {http}
// ! but just use http instead bc that module doesn't have http property to be exported
// ! but only the default one
import http from "http";

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(upperCase("this text will be in upper case !!"));
    res.end();
  })
  .listen(8080);