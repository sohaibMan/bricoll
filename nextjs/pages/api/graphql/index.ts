import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import clientPromise from "../../../lib/mongodb"
import path from 'node:path'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { Document, ObjectId, WithId } from 'mongodb';
import { Project, Resolvers } from '../../../types/resolvers';

const client = await clientPromise
const db = client.db("bricoll")
const projectsCollection = db.collection("projects")


// path to this folders
const rootPath = path.join(__dirname, "../../../../", "pages/api/graphql")
//path to schema from this folder
const schemaPath = path.join(rootPath, "/schema/*.graphql");
// console.log("🚀 ~ file: index.ts:9 ~ schemaPath:", schemaPath)
const typeDefs = loadSchemaSync(schemaPath, { loaders: [new GraphQLFileLoader()] })



// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query: {
    Projects:
      async (parent, args, context, info) => {
        // to add scrolling pagination 
        const projects = await projectsCollection.aggregate([{ $sample: { size: 20 } }]).toArray()
        return projects as Project[];
      },
    Project: async (parent, args, context, info) => {
      const project = await projectsCollection.findOne({ _id: new ObjectId(args.id) });
      return project as Project;
    }
  },
  Mutation: {
    addProject: async (parent, args, context, info) => {
      const project = await projectsCollection.insertOne({
        ...args,
        reactions: {
          likes: 0,
          dislikes: 0,
        },
        created_date: new Date(),
      })
      return {
        ackandlodement: project.acknowledged,
        _id: project.insertedId
      };


    },
    editProject: async (parent, args, context, info) => {
      const updateProject = await projectsCollection.updateOne(
        { _id: new ObjectId(args.id) },
        {
          $set: {
            ...args
          }
        }
      )
      return {
        ackandlodement: updateProject.acknowledged,
        _id: args.id
      }
    },
    deleteProject: async (parent, args, context, info) => {
      // todo ;add a check if the user is the owner of the project
      const deleteProject = await projectsCollection.deleteOne({ _id: new ObjectId(args.id) })
      return {
        ackandlodement: deleteProject.acknowledged && deleteProject.deletedCount === 1,
        _id: args.id
      }
    }


  }
}



const server = new ApolloServer({
  resolvers,
  typeDefs
});

export default startServerAndCreateNextHandler(server);

