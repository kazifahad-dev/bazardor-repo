import dns from "node:dns";
import { MongoClient } from "mongodb";


dns.setServers(["8.8.8.8", "1.1.1.1"]);


const globalForMongo = globalThis;

const client =
  globalForMongo._mongoClient ?? new MongoClient(process.env.MONGODB_URI);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}


export const db = client.db();