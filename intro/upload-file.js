// * formidable module - a good module for working with file uploads
// * dl and install using npm (formidable)

import formidable from "formidable";
import http from "http";
import fs from "fs";
import path from "path";

// * creating an HTML form for uploading files
http
  .createServer(function (req, res) {
    // * parsing the uploaded file
    // * using the formidable object
    if (req.url === "/fileUpload") {
      // const form = new formidable.IncomingForm(); this example is outdated -not working anymore
      const form = formidable({}); // * new version
      form.parse(req, function (err, fields, files) {
        // * saving the file
        // * when file is uploaded it is located in temporary folder
        // * the path is in "files" object - 3rd argument in parse() func
        // * using the fs module to move the file to specific folder
        // ! NOTE : fileToUpload always returns an array so fileToUpload will not work but fileToUpload[0] will.
        const oldPath = files.fileToUpload[0].filepath;
        // ! for some reason renaming is not permitted bc of cross-platform bs
        // ! solution use path module
        // const newPath =
        //   "D:\\WebDev\\TECH STACK\\MERN\\node.js\\intro\\forUploadingFiles\\" +
        //   files.fileToUpload[0].originalFilename; --not woring
        const originalFilename = files.fileToUpload[0].originalFilename;
        const newPath = path.join(
          "D:\\WebDev\\TECH STACK\\MERN\\node.js\\intro\\forUploadingFiles",
          originalFilename
        );

        // ! renaming is not working
        // fs.rename(oldPath, newPath, function (err) {
        //   if (err) throw err;
        //   res.write("FILE UPLOADED AND MOVED!");
        //   res.end();
        // });

        // * use the copy and del prev file
        // * if file already exist it copying it wont do anything
        fs.copyFile(oldPath, newPath, function (err) {
          if (err) throw err;
          res.write("FILE UPLOADED AND OLD FILE COPIED TO NEW FOLDER!");
          res.end();
        });
        /* uncomment this if u want to removed the old file after copying to new folder
        fs.unlink(oldPath, function (err) {
          if (err) throw err;
          res.write("OLD FILE REMOVED!");
          res.end();
        });*/
      });
    } else {
      // * uploading files
      res.writeHead(200, { "Content-Type": "text/html" });
      let htmlContents = `
        <form action="fileUpload" method="POST" enctype="multipart/form-data">
          <input type="file" name="fileToUpload"><br>
          <input type="submit">
        </form>
      `;
      res.write(htmlContents);
      return res.end();
    }
  })
  .listen(8080);
