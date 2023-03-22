import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from '../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    const client = await clientPromise
    const db = client.db("sample_mflix")
    const collection = db.collection("theaters")
    const result = await collection.find({}).toArray()

    return res.status(200).json({ status: "ok", result })
}