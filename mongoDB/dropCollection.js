import { MongoClient } from "mongodb";

const databaseName = "nodesampmongodb";
const url = "mongodb://localhost:27017/" + databaseName;

// * u can delete a table/collection using drop() method in mongodb
async function dropCollection(collectionName) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(databaseName);
    // * check first if the collection to be deleted exists
    if (await db.listCollections({ name: collectionName }).next()) {
      // * then delete it
      const resultv1 = await db.collection(collectionName).drop();
      // * this is for more a straight-forward approach
      // const resultv2 = await db.dropCollection(collectionName);
      if (resultv1) {
        console.log("COLLECTION DELETED! : ", collectionName);
      }
    } else {
      console.log("COLLECTION DOESN'T EXIST : ", collectionName);
    }
    await client.close();
  } catch (error) {
    throw error;
  }
}

dropCollection("customers");
