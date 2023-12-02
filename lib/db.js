import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let database;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
    database = client.db("nextpricedemo");
  }
  return database;
}

export { connectDB };
