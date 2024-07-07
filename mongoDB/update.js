import { MongoClient } from "mongodb";

const databaseName = "nodesampmongodb";
const url = "mongodb://localhost:27017/" + databaseName;

// * updateOne() - used to update a record or document,
// * 1st accepts the query object to update, then 2nd accepts an object containing new values
async function updateRecord(queryObject, updatedValues, type = "many") {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(databaseName);
    const collectionName = "customers";

    let result = null;
    if (type === "one") {
      result = await db
        .collection(collectionName)
        .updateOne(queryObject, updatedValues);
    } else {
      result = await db
        .collection(collectionName)
        .updateMany(queryObject, updatedValues);
    }

    if (result) {
      console.log("UPDATED DOCUMENT : ", result.modifiedCount);
    }

    await client.close();
  } catch (error) {
    throw error;
  }
}

// * 1st param = queryObject to update
// * 2nd param = new values for that document
// * NOTE : in new value use {$set{props and values here}}
// * NOTE : the property or field name specified inside the new values
// *    will be the only one to be modified
updateRecord(
  { name: "HOTDOG KA PALA EH!" },
  { $set: { name: "Jessi Alamil" } },
  "one"
);

// * this will update all the record that will find by the query
// * to find all the record with letter i just use /i/ not /^i^/
updateRecord(
  { name: /UPDATED/ },
  { $set: { name: "HOTDOG KA PALA EH!" } },
  "many"
);
