import { MongoClient } from "mongodb";
import fs from 'fs'
require("dotenv").config({ path: "./src/app/environments/.env" });

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("test");
    const foods = database.collection("employeeseducations"); // COLLECTION!

    // create an array of documents to insert
    // const docs = [
    //   { name: "cake", healthy: false },
    //   { name: "lettuce", healthy: true },
    //   { name: "donut", healthy: false },
    // ];
    let docs = fs.readFileSync(
        "../../../../client/src/assets/emplsEducation.json", // FILENAME!
        "utf8");
    docs = JSON.parse(docs);
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };

    const result = await foods.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
