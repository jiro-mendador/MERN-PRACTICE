import { MongoClient } from "mongodb";

const databaseName = "nodesampmongodb";
const url = "mongodb://localhost:27017/" + databaseName;

// * deleteOne() - used to delete one record or document,
// * if the query returns many document the first one will be the one to be deleted
async function queryDeleteOne(queryObject) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(databaseName);
    const collectionName = "customers";
    const result = await db.collection(collectionName).deleteOne(queryObject);
    if (result) {
      console.log("1 document deleted : ", queryObject);
    }
    await client.close();
  } catch (error) {
    throw error;
  }
}
// queryDeleteOne({ id: "hotdog" });

// * deleteMany - used to delete more than one document, the 1st param is the same with deleteOne()
async function queryDeleteMany(queryObject) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(databaseName);
    const collectionName = "customers";
    const result = await db.collection(collectionName).deleteMany(queryObject);
    if (result) {
      console.log("documents deleted : ", result.deletedCount);
    }
    await client.close();
  } catch (error) {
    throw error;
  }
}
// * deletes all document that starts with letter j
// queryDeleteMany({ name: /^J/ });
