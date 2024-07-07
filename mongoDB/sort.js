import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/nodesampmongodb";

// * sort() method - used to sort results in descending or ascending order
// * it takes one parameter, an obj definig the sorting order

async function sortQuery(queryObject, sortObject) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("nodesampmongodb");
    const collectionName = "customers";

    // * NOTE : u will still use find() to get the query then the sort() method will come after
    const result = await db
      .collection(collectionName)
      .find(queryObject)
      .sort(sortObject)
      .toArray();
    if (result) {
      console.log("RESULT OF SORT() : ", result ?? "NO DOCUMENT AVAILABLE");
    }
    await client.close();
  } catch (err) {
    throw err;
  }
}

// * this query the document then sort them alphabetically in ascending order
sortQuery({}, { name: 1 });

// * this query the document then sort them alphabetically in descending order
sortQuery({}, { name: -1 });
