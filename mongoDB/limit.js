import { MongoClient } from "mongodb";

const databaseName = "nodesampmongodb";
const url = "mongodb://localhost:27017/" + databaseName;

// * limit() method - used to limit the returned result
// * takes 1 parameter the determines the number of document to output
async function queryLimit(queryObject, limitCount) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(databaseName);
    const collectionName = "customers";

    const result = await db
      .collection(collectionName)
      .find(queryObject)
      .limit(limitCount)
      .toArray();
    if (result) {
      console.log(`LIMIT ${limitCount} RESULT : `, result);
    }
    await client.close();
  } catch (error) {
    throw error;
  }
}

queryLimit({ name: /J/ }, 3);
