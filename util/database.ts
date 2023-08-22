import { MongoClient, MongoClientOptions } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

declare global {
  var _mongo: Promise<MongoClient>;
}

const url = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.wzprsze.mongodb.net/`;
const options: MongoClientOptions = {};
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
