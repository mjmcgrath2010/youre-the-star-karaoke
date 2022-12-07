import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

let client;
let clientPromise: Promise<any>;

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

client = mongoose
  .connect(`${uri}`, {})
  .then((client) => client)
  .catch((err) => {});
clientPromise = client;

export default clientPromise;
