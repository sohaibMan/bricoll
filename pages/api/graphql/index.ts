import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import clientPromise from "../../../lib/mongodb";
import path from 'node:path'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'



const client = await clientPromise
const db = client.db("sample_mflix")
const moviesCollection = db.collection("movies")


// path to this folders
const rootPath = path.join(__dirname, "../../../../", "pages/api/graphql")
//path to schema from this folder
const schemaPath = path.join(rootPath, "/schema/*.graphql");
// console.log("🚀 ~ file: index.ts:9 ~ schemaPath:", schemaPath)
const typeDefs = loadSchemaSync(schemaPath, { loaders: [new GraphQLFileLoader()] })


const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    Movies: async () => await moviesCollection.find({}).toArray(),
  },
};


const server = new ApolloServer({
  resolvers,
  typeDefs
});

export default startServerAndCreateNextHandler(server);

