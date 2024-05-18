import {Promise} from "mongoose";
import {MongoClient} from "mongodb";

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

declare module "*.png" {
    const value: any;
    export = value;
}

export {}