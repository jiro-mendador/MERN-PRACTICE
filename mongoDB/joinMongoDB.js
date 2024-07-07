import { MongoClient } from "mongodb";

const databaseName = "nodesampmongodb";
const url = "mongodb://localhost:27017/" + databaseName;

// * mongodb is not relational database but it can do left outer join using $lookup stage.
// * $lookup stage - let's u specify which collection u want to join with current collection,
// *    and which field should match
async function queryJoin(collectionOne, collectionTwo) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(databaseName);

    // * joining collectionOne with collectionTwo through the type and _id of customers_type
    // ! NOTE : DONT FORGET THE toArray() method at the end when the result expects many return values
    const result = await db
      .collection(collectionOne)
      .aggregate([
        {
          $lookup: {
            from: collectionTwo, // * the collection to join the current one
            localField: "type", // * the field in the current collection
            foreignField: "_id", // * the field in the other collection
            as: "type_details",
          },
        },
        {
          // * NOTE : since $lookup is just another object u can also put the projection property here as 'project'
          // * then set the fields u only want to see in result
          // * $lookup and $projection should be separated like this {},{} inside aggregate method ([])
          $project: {
            _id: 0,
            name: 1,
            // * for the 2nd collection if u only want to display some fields use this
            type_details: {
              type_id: { $arrayElemAt: ["$type_details._id", 0] },
              type_name: { $arrayElemAt: ["$type_details.type_name", 0] },
            },
            // * u can also do this if u dont want the property name to be displayed
            // type_details: { $arrayElemAt: ["$type_details.type_name", 0] },
          },
        },
      ])
      .toArray();

    if (result) {
      // ! NOTE : U NEED TO USE jsong.stringify(result) to see the joined collection
      console.log(`JOINING ${collectionOne} with ${collectionTwo} RESULT : `);
      for (let rs of result) {
        console.log(JSON.stringify(rs));
      }
    }
    await client.close();
  } catch (error) {
    throw error;
  }
}

queryJoin("customers", "customer_type");