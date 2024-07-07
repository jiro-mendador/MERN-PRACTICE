import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/nodesampmongodb";

// * in mongodb to find a document(record/row/data) in a collection(table) we use find/findOne
// * it is like the SELECT statement in mysql

async function findSingle() {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db("nodesampmongodb");
    const collectionName = "customers";

    // * findOne method returns just the first occurence in the document
    // * the findOne is a query object, when it is empty it will return all documents in a collection
    // * but in findOne it will only return the first one
    const findOneRes = await db.collection(collectionName).findOne({});

    // * find can also be used to select a document in a collection
    // * find - returns all occurences in a collection
    // * same in findOne, find is also a query object, when empty it will return all documents
    const findRes = await db.collection(collectionName).find({}).toArray();

    // * findSome - it is like the SELECT with specific field/column in db, 2nd parameter of the find() method is a projection object
    // * projection - describes which fields will be included in the result, it is optional, when empty it will return all
    // * projection should be - {projection:{props : value here}}
    // ! NOTE : You are not allowed to specify both 0 and 1 values in the same object
    // ! (except if one of the fields is the _id field). If you specify a field with the value 0,
    // ! all other fields get the value 1, and vice versa:
    // * ex. _id : 0, name : 1, address : 1 - correct
    // * ex. _id : 0, name : 1, address : 0 - incorrect
    // * ex. _id : 0, name : 0, address : 1 - incorrect
    // * ex. _id : 0, name : 0, address : 0 - correct
    // * ex. _id : 1, name : 0, address : 0 - correct
    // * if u dont want to include it just dont put the property
    // * - but that means it will return all the other column/prop when u dont put it there
    const findSome = await db
      .collection(collectionName)
      // * this means in sql - select name, address in customers
      .find({}, { projection: { _id: 0, name: 1, address: 1 } })
      .toArray();

    if (findOneRes) {
      console.log("findOne Result :", findOneRes);
    }

    if (findRes) {
      console.log("find (ALL) Result :", findRes);
    }

    if (findSome) {
      console.log("find (SOME) Result :", findSome);
      // * result can be converted to array to return each document data
      console.log(
        "FIRST DOCUMENT DATA IN RESULT ARRAY :",
        findSome[0],
        findSome[0].name,
        findSome[0].address
      );
    }

    await client.close();
  } catch (err) {
    throw err;
  }
}

findSingle();
