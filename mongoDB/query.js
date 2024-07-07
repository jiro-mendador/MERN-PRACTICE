import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/nodesampmongodb";

// * u can filter the result when finding documents using a query object
async function query(queryObject) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("nodesampmongodb");
    const collectionName = "customers";

    //* put the query object inside the find() method
    // ! NOTE : DONT FORGET THE TO ARRAY METHOD AT THE END WHEN U USE FIND()
    const result = await db
      .collection(collectionName)
      .find(queryObject)
      .toArray();
    if (result) {
      console.log(`RESULT FOR QUERY : `, result);
    }
    await client.close();
  } catch (err) {
    throw err;
  }
}
// query({ name: "Jiro Mendador", address: "Caloocan" });

// * u can use regex or regular expressions to find documents
// * always put the regex inside the // and not inside a quotation string
// * to find documents with name that starts with J
query({ name: /^J/ });