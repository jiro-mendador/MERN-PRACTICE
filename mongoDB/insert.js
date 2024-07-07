import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/nodesampmongodb";

// * a record is called a DOCUMENT in mongoDB
async function insertSingle(data) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("nodesampmongodb");
    const collectionName = "customer_type";
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

// * when inserting multiple data it should be an array of object
async function insertMultiple(data) {
  try {
    const client = await MongoClient.connect(url);
    // ! NOTE : IF EVER YOU MISPELLED THE DB NAME THE MONGODB WILL CREATE A NEW ONE INSTEAD WITH YOUR TABLE AND DATA
    const db = client.db("nodesampmongodb");
    const collectionName = "customers";
    const insertData = data;

    const result = await db.collection(collectionName).insertMany(insertData);

    // * THE RESULT OBJ - when using insertMany it return a result object, it has information about the insertion
    /**
     * EXAMPLE LOOK
            * {
          result: { ok: 1, n: 3 },
          ops: [
            { name: 'John', address: 'Highway 71', _id: 58fdbf5c0ef8a50b4cdd9a84 },
            { name: 'Peter', address: 'Lowstreet 4', _id: 58fdbf5c0ef8a50b4cdd9a85 },
            { name: 'Amy', address: 'Apple st 652', _id: 58fdbf5c0ef8a50b4cdd9a86 },
          insertedCount: 3,
          insertedIds: [
            58fdbf5c0ef8a50b4cdd9a84,
            58fdbf5c0ef8a50b4cdd9a85,
            58fdbf5c0ef8a50b4cdd9a86 ]
        }
     * 
     * 
     */
    // * _id fields - when u didn't specify an id when inserting mongoDB will generate 1

    if (result) {
      console.log("MULTIPLE DATA INSERTED!");
      console.log("NO OF DATA INSERTED :", result.insertedCount);
    }
    await client.close();
  } catch (err) {
    throw err;
  }
}

// * uncomment to use
// insertSingle({ _id: 1, type: "VIP" });
// insertSingle({ _id: 2, type: "Regular" });
// insertSingle({ _id: 3, type: "Inactive" });
// insertMultiple([
//   { name: "First", address: "First" },
//   { name: "Second", address: "Second" },
//   { name: "Third", address: "Third" },
// ]);

// * with _id, so mongodb will not auto generate id
// * with _id, value must be unique for each document
// insertMultiple([
//   { _id: 4, name: "Jiro Mendador", address: "Caloocan", type: 1 },
//   { _id: 5, name: "Jenny First", address: "USA", type: 2 },
//   { _id: 6, name: "Lorenzo Alberto", address: "China", type: 3 },
// ]);
