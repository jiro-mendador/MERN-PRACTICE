import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/nodesampmongodb";

// ! NOTE : mongoDB tutorial in w3school seems to be outdated.
// ! new version uses async/promise now
// ! NOTE : a database wont appear unless it has at least 1 collection/table

async function createCollection() {
  try {
    const client = await MongoClient.connect(url);
    console.log("Connected to MongoDB");

    const db = client.db("nodesampmongodb");
    const collectionName = "customers";

    // Check if the collection already exists
    const collinfo = await db.listCollections({ name: collectionName }).next();

    if (collinfo) {
      console.log(`Collection '${collectionName}' already exists.`);
    } else {
      // Create the collection if it doesn't exist
      await db.createCollection(collectionName);
      console.log("MongoDB database and collection created!");
    }

    // Close the connection
    await client.close();
    console.log("Connection closed.");
  } catch (err) {
    console.error("Error:", err);
  }
}

// Call the async function
createCollection();
