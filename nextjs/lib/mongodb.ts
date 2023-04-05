import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}




class MongoClientConnection {
    private static _instance: MongoClient;

    private constructor() {

        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const client = new MongoClient(process.env.MONGODB_URI || "mongodb://bricoll_mongo:27017/bricoll", {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        }
        );

        MongoClientConnection._instance = client;

    }

    static async getInstance() {
        if (this._instance) {
            await this._instance.connect();
            // Send a ping to confirm a successful connection
            await this._instance.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            return this._instance;
        }

        new MongoClientConnection();
        return this._instance;
    }
}

const client = await MongoClientConnection.getInstance();

const db = client.db("bricoll");

export default db;