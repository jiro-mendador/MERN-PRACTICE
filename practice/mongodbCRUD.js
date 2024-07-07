import fs from "fs";
import http from "http";
import { MongoClient } from "mongodb";
import qs from "querystring";
import urlFromUrl from "url";

http
  .createServer(async function (req, res) {
    if (req.method === "POST") {
      let data = "";
      req.on("data", function (chunkOfData) {
        data += chunkOfData;
        if (data.length > 1e6) {
          req.socket.destroy();
        }
      });
      req.on("end", async function () {
        let POST = qs.parse(data);

        // * form fields
        const fName = POST.firstName;
        const lName = POST.lastName;
        const course = POST.course;
        const year = POST.year;
        const section = POST.section;

        let message = "";
        let id = POST.id || 0;

        if (POST.insert || POST.update) {
          if (isNull([fName, lName, course, year, section])) {
            res.writeHead(302, {
              Location: "/?error=NULLFIELD",
            });
            return res.end();
          } else {
            if (POST.insert) {
              await insertSingle({
                _id: await getLastIdInCollection({}, { _id: -1 }),
                firstName: fName,
                lastName: lName,
                course: course,
                year: year,
                section: section,
              });
              message = "insert";
            } else if (POST.update) {
              await updateStudent(
                { _id: parseInt(POST.updateID) },
                {
                  $set: {
                    firstName: fName,
                    lastName: lName,
                    course: course,
                    year: year,
                    section: section,
                  },
                }
              );
              message = "update";
            }
          }
        } else if (POST.edit) {
          message = `edit&&id=${id}`;
        } else if (POST.delete) {
          await deleteStudent({ _id: parseInt(id) });
          message = "delete";
        }

        res.writeHead(302, {
          Location: `/?message=${message}`,
        });
        return res.end();
      });
    } else {
      const students = await getAllStudents();
      const contents = getTableContents(students);
      const inputs = getInputFields("insert", {
        firstName: "",
        lastName: "",
        course: "",
        year: "",
        section: "",
      });

      const parsedUrl = urlFromUrl.parse(req.url, true);

      let output = contents + inputs;
      if (parsedUrl.query.error === "NULLFIELD") {
        output += `<h3 style="color:red;" class="visible">CANNOT CONTINUE WITH EMPTY FIELDS!!<h3>`;
      } else if (parsedUrl.query.message === "insert") {
        output += `<h3 style="color:green;" class="visible">INSERT SUCCESS!<h3>`;
      } else if (parsedUrl.query.message === "delete") {
        output += `<h3 style="color:green;" class="visible">DELETE SUCCESS!<h3>`;
      } else if (parsedUrl.query.message === "edit") {
        // ! NOTE : MONGODB IS STRICT IN DATA TYPES SO STRING AND INT CAN'T BE USED INTERCHANGEABLY, U NEED TO PARSE, VICE VERSA
        const result = await getStudentInfo({
          _id: parseInt(parsedUrl.query.id),
        });
        output =
          contents +
          getInputFields("update", {
            id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            course: result.course,
            year: result.year,
            section: result.section,
          });
        output += `<h3 style="color:green;" class="visible">EDITING DATA...<h3>`;
      } else if (parsedUrl.query.message === "update") {
        output += `<h3 style="color:green;" class="visible">UPDATE SUCCESS!!<h3>`;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(output || "NO HTML CONTENT TO DISPLAY");
      return res.end();
    }
  })
  .listen(8080);

const url = "mongodb://localhost:27017/nodesampmongodb";
async function initDB() {
  const client = await MongoClient.connect(url);
  const db = client.db("schoolmongodb");
  const collectionName = "students";

  //* Check if the collection already exists
  const collinfo = await db.listCollections({ name: collectionName }).next();

  if (collinfo) {
    console.log(`Collection '${collectionName}' already exists.`);
  } else {
    await db.createCollection(collectionName);
    console.log("COLLECTION CREATED!");
  }

  await client.close();
  console.log("CONNECTION CLOSED");
}
initDB();

async function insertSingle(data) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("schoolmongodb");
    const collectionName = "students";
    const insertData = data;
    const result = await db.collection(collectionName).insertOne(insertData);
    if (result) {
      console.log("SINGLE DATA INSERTED!");
    }
    await client.close();
  } catch (err) {
    throw err;
  }
}

async function getLastIdInCollection(queryObject, sortObject) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("schoolmongodb");
    const collectionName = "students";

    const result = await db
      .collection(collectionName)
      .find(queryObject)
      .sort(sortObject)
      .limit(1)
      .toArray();
    if (result) {
      if (result.length > 0) {
        console.log("LAST ID IS : ", result[0]._id);
        return result[0]._id + 1;
      }
    }
    await client.close();
    return 1;
  } catch (err) {
    throw err;
  }
}

async function getStudentInfo(queryObject) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("schoolmongodb");
    const collectionName = "students";

    const result = await db
      .collection(collectionName)
      .find(queryObject)
      .limit(1)
      .toArray();
    if (result) {
      console.log("STUDENT INFO : ", result[0]);
      return result[0] ?? null;
    }
    await client.close();
    return null;
  } catch (err) {
    throw err;
  }
}

async function getAllStudents() {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("schoolmongodb");
    const collectionName = "students";

    const result = await db.collection(collectionName).find({}).toArray();
    if (result) {
      // console.log("STUDENT INFO : ", result);
      return result ?? null;
    }
    await client.close();
    return null;
  } catch (err) {
    throw err;
  }
}

async function deleteStudent(queryObject) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("schoolmongodb");
    const collectionName = "students";
    const result = await db.collection(collectionName).deleteOne(queryObject);
    if (result) {
      console.log("1 document deleted : ", queryObject);
    }
    await client.close();
  } catch (error) {
    throw error;
  }
}

async function updateStudent(queryObject, updatedValues) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("schoolmongodb");
    const collectionName = "students";

    let result = await db
      .collection(collectionName)
      .updateOne(queryObject, updatedValues);

    if (result) {
      console.log("UPDATED DOCUMENT : ", result.modifiedCount);
    }

    await client.close();
  } catch (error) {
    throw error;
  }
}

function isNull(fields) {
  let isFieldNull = false;
  fields.forEach((element) => {
    if ((element === undefined || element.trim()) === "") {
      isFieldNull = true;
    }
  });
  return isFieldNull;
}

function getTableContents(dataArray) {
  let tableStyles = `
    <style>
      * {
        box-sizing: border-box;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }

      html,
      body {
        height: 100%;
      }

      body {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        gap: 1em;
      }

      form,
      table {
        width: clamp(0px, 100%, 700px);
        overflow: auto;
      }

      table,
      th,
      td {
        border-collapse: collapse; /*to remove double borders*/
      }

      td:last-child {
        display: flex;
        flex-flow: row wrap;
        gap: 1em;
      }

      td:last-child input {
        padding: 0.7em;
        border-radius: 10px;
        border: none;
        width: clamp(0px, 100%, 5em);
      }

      td:last-child input:first-child {
        background-color: lightskyblue;
        color: lightcyan;
      }

      td:last-child input:last-child {
        background-color: lightpink;
        color: red;
      }

      th,
      td {
        text-align: left;
        padding: 1em 0.5em;
      }

      tr {
        color: #0e0e0e;
        border-bottom: 1px solid #ddd;
      }

      tr:hover:not(:first-child) {
        background-color: #61bdf7;
        color: white;
      }

      td:not(:last-child) > input {
        border: none;
        background-color: transparent;
        font-size: 1em;
        pointer-events: none;
        width: 100%;
      }

    </style>
  `;
  let tableBody = `
      <h1>MONGODB CRUD</h1>
    <form
      name="outputs"
      action="./"
      method="POST"
      enctype="application/x-www-form-urlencoded"
      class="output"
    >
      <table>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Course</th>
          <th>Year</th>
          <th>Section</th>
          <th>Actions</th>
        </tr>`;

  if (dataArray !== null && dataArray.length > 0) {
    for (let data of dataArray) {
      tableBody += `
      <form
          action="./"
          method="POST"
          enctype="application/x-www-form-urlencoded"
      >
        <tr>
          <td>
            <input type="text" name="id" value="${data._id}" readonly />
          </td>
          <td><input type="text" name="firtName" value="${data.firstName}" readonly /></td>
          <td>
            <input type="text" name="lastName" value="${data.lastName}" readonly />
          </td>
          <td><input type="text" name="course" value="${data.course}" readonly /></td>
          <td><input type="text" name="year" value="${data.year}" readonly /></td>
          <td><input type="text" name="section" value="${data.section}" readonly /></td>
          <td>
            <input type="submit" value="EDIT" name="edit" />
            <input type="submit" value="DELETE" name="delete" />
          </td>
        </tr>
        </form>
        `;
    }
  } else {
    tableBody += `<tr><td colspan="7" style="text-align:center; color:GREEN;">NO DATA AVAILABLE....</td><td></td><td></td><td></td><td></td><td></td></tr>`;
  }

  tableBody += `
      </table>
    </form>
  `;
  return tableStyles + tableBody;
}

function getInputFields(type, data) {
  let inputStyles = `
 <style>
      * {
        box-sizing: border-box;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }

      html,
      body {
        height: 100%;
      }

      body {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        gap: 1em;
      }

      form {
        width: clamp(0px, 100%, 700px);
        overflow: auto;
      }

      .input {
        display: flex;
        flex-flow: column nowrap;
        padding: 1em;
        gap: 1em;
      }

      .input div {
        display: flex;
        flex-flow: row wrap;
        gap: 1em;
      }

      .input div > * {
        flex: 1;
      }

      .input > div > input,
      .input select {
        padding: 0.5em;
      }

      .input > input {
        background-color: lightgreen;
        color: white;
        padding: 1em;
        border-radius: 10px;
        border: none;
      }

      .visible {
    visibility: visible;
    animation: fadeOut 2s forwards;
  }

  @keyframes fadeOut {
    0% {
      visibility: visible;
    }
    100% {
      visibility: hidden;
    }
  }

    </style>
`;

  let inputBody = `
 <form
      action="./"
      method="POST"
      enctype="application/x-www-form-urlencoded"
      class="input"
      name="inputs"
    >
      <div>
        <label for="firstName">First Name</label>
        <input type="text" name="firstName" value="${data.firstName}" />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input type="text" name="lastName" value="${data.lastName}" />
      </div>
      <div>
        <label for="course">Course</label>
       <select name="course">
        <option value="BSCS" ${
          data.course === "BSCS" ? "selected" : ""
        }>BSCS</option>
        <option value="BSIT" ${
          data.course === "BSIT" ? "selected" : ""
        }>BSIT</option>
        <option value="BSEMC" ${
          data.course === "BSEMC" ? "selected" : ""
        }>BSEMC</option>
        <option value="BSIS" ${
          data.course === "BSIS" ? "selected" : ""
        }>BSIS</option>
      </select>
      </div>
      <div>
        <label for="year">Year</label>
        <select name="year">
          <option value="1" ${data.year === "1" ? "selected" : ""}>1</option>
          <option value="2" ${data.year === "2" ? "selected" : ""}>2</option>
          <option value="3" ${data.year === "3" ? "selected" : ""}>3</option>
          <option value="4" ${data.year === "4" ? "selected" : ""}>4</option>
        </select>
      </div>
      <div>
        <label for="section">Section</label>
        <select name="section">
          <option value="A" ${data.section === "A" ? "selected" : ""}>A</option>
          <option value="B" ${data.section === "B" ? "selected" : ""}>B</option>
          <option value="C" ${data.section === "C" ? "selected" : ""}>C</option>
          <option value="D" ${data.section === "D" ? "selected" : ""}>D</option>
          <option value="E" ${data.section === "E" ? "selected" : ""}>E</option>
        </select>
      </div>
`;

  if (type === "insert") {
    inputBody += ` <input type="submit" value="INSERT" name="insert" />
    </form>`;
  } else {
    inputBody += ` <input type="text" value="${data.id}" name="updateID" style="display:none;"/>`;
    inputBody += ` <input type="submit" value="UPDATE" name="update" />
    </form>`;
  }

  return inputStyles + inputBody;
}
