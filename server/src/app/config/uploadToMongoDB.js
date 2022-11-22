import { MongoClient } from "mongodb";
import fs from 'fs'

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://Admin:CQnx7ySdomAIxl35@cluster0.ickh3tv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("test");
    const foods = database.collection("employees");

    // create an array of documents to insert
    // const docs = [
    //   { name: "cake", healthy: false },
    //   { name: "lettuce", healthy: true },
    //   { name: "donut", healthy: false },
    // ];
    let docs = fs.readFileSync(
        "../../../../client/src/assets/empls.json",
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
