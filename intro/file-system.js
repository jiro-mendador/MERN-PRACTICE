// * file system module allows u to work with file system in your computer
var fileSystem = require("fs");

/**
 * * common usage
 ** Read files
 ** Create files
 ** Update files
 ** Delete files
 ** Rename files
 */

//  * fs.readFile() - for reading files in your computer
var http = require("http");
http
  .createServer((req, res) => {
    const fileName = "file-system.html";
    fileSystem.readFile(fileName, function (error, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);

// * methods for creating new files
/**
 * * fs.appendFile() - appends content to a file. if file !exist it will be created
 * * fs.open() - opens files, if file !exist it will be created, w for = writing
 * * fs.writeFile() - writes to a file
 */

// * since the spec file does not exist yet it will be created
fileSystem.appendFile(
  "appendFile.txt",
  "THIS TEXT IS WRITTEN USING fs.appendFile()",
  function (err) {
    if (err) {
      throw err;
    }
    console.log("saved!");
  }
);

// * fs.open() - flag as 2nd arg w = writing, creates new file if there isn't
fileSystem.open("openFile.txt", "w", function (err) {
  if (err) throw err;
  console.log("saved!");
});

// * fs.writeFile() - replaces the spec file if it exist. new file created if not w the contents.
fileSystem.writeFile(
  "writeFile.txt",
  "THIS TEXT WAS WRITTEN USING fs.writeFile()",
  function (err) {
    if (err) throw err;
    console.log("saved!");
  }
);

// * methods for updating files
/**
 * * fs.appendFile()
 * * fs.writeFile()
 */

fileSystem.appendFile(
  "appendFile.txt",
  "THIS TEXT WAS APPENDED USING appenFile()",
  function (err) {
    if (err) throw err;
    console.log("saved!");
  }
);

// * replace the content of writeFile.txt()
fileSystem.writeFile(
  "writeFile.txt",
  "THIS TEXT REPLACED THE PREV ONE",
  function (err) {
    if (err) throw err;
    console.log("saved!");
  }
);

// * deleting files
function delFile() {
  fileSystem.unlink("openFile.txt", function (err) {
    if (err) throw err;
    console.log("deleted!");
  });
}
// delFile();

// * for renaming files
fileSystem.rename("openFile.txt", "openFileRenamed.txt", function (err) {
  if (err) throw err;
  console.log("renamed!");
});