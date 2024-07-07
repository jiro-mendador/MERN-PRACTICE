import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/nodesampmongodb";

// async function dropCollection() {
//   try {
//     const client = await MongoClient.connect(url);
//     const db = client.db("nodesampmongodb");
//     const collectionName = "customers";

//     const result = await db.collection(collectionName).drop();

//     if (result) {
//       console.log("COLLECTION DELETED!");
//     } else {
//       console.log("Collection not found or already deleted.");
//     }

//     // Close the connection
//     await client.close();
//     console.log("Connection closed.");
//   } catch (err) {
//     console.error("Error:", err);
//   }
// }

// Call the async function
// dropCollection();

// * COLLECTION IN NOSQL MONGODB IS LIKE A TABLE IN SQL MYSQL
async function createCollection() {
  const client = await MongoClient.connect(url); // * an await in MongoClient that waits for connection is important
  const db = client.db("nodesampmongodb");
  const collectionName = "customers";

  // Check if the collection already exists
  const collinfo = await db.listCollections({ name: collectionName }).next(); // * an await here is also important

  if (collinfo) {
    console.log(`Collection '${collectionName}' already exists.`);
  } else {
    await db.createCollection(collectionName); // * same as this any action with client db or connection an await is important
    console.log("COLLECTION CREATED!");
  }

  await client.close(); // * an await for closing connection
  console.log("CONNECTION CLOSED");
}

createCollection();
