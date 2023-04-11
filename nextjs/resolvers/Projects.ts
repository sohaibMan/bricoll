import { Project, Proposal, Resolvers } from "../types/resolvers.d";
import { ObjectId } from "mongodb";

import { getToken } from "next-auth/jwt";

import db from "../lib/mongodb";
import { GraphQLError } from "graphql";
import { ServerContext } from "../types/server-context";
const projectsCollection = db.collection("projects");
const proposalsCollection = db.collection("proposals");

const secret = process.env.NEXTAUTH_SECRET;

export const ProjectResolvers: Resolvers = {
  Query: {
    Projects: async (parent, args, context, info) => {
      // to add scrolling pagination
      // ? public
      const projects = await projectsCollection
        .aggregate([{ $sample: { size: 20 } }])
        .toArray();
      return projects as Project[];
    },
    Project: async (parent, args, context, info) => {
      // ? private
      const project = await projectsCollection.findOne({
        _id: new ObjectId(args.id),
      });
      if (!project)
        throw new GraphQLError("There is no project with this Id", {
          extensions: {
            code: "NOTFOUND",
            http: { status: 404 },
          },
        });
      return project as Project;
    },
  },
  Project: {
    // one (resolvers chaine)
    proposals: async (parent) => {
      // many
      const proposals = await proposalsCollection
        .find({ project_id: new ObjectId(parent._id) })
        .toArray();
      return proposals as unknown as Proposal[];
    },
  },
  Mutation: {
    addProject: async (parent, args, context, info) => {
      // ? private
      if (!context.user)
        throw new GraphQLError("You are unauthorized", {
          extensions: {
            code: "unauthorized",
            http: { status: 401 },
          },
        });

      const project: Project = {
        ...args,
        client_id: new ObjectId(context.user.id),
        reactions: {
          love: 0,
          dislike: 0,
        },
        created_at: new Date(),
      };
      const insertedProject = await projectsCollection.insertOne(project);
      return insertedProject.acknowledged ? project : null;
    },
    editProject: async (parent, args, context: ServerContext, info) => {
      // private
      if (!context.user)
        throw new GraphQLError("You are unauthorized", {
          extensions: {
            code: "unauthorized",
            http: { status: 401 },
          },
        });
      const updateProject = await projectsCollection.findOneAndUpdate(
        {
          _id: new ObjectId(args.id),
          client_id: new ObjectId(context.user.id),
        },
        {
          $set: {
            ...args,
          },
        },
        {
          returnDocument: "after",
        }
      );
      return updateProject as unknown as Project;
    },
    deleteProject: async (parent, args, context, info) => {
      // todo ;add a check if the user is the owner of the project
      //todo : check is the project active ...
      if (!context.user)
        throw new GraphQLError("You are unauthorized", {
          extensions: {
            code: "unauthorized",
            http: { status: 401 },
          },
        });

      const deleteProject = await projectsCollection.deleteOne({
        _id: new ObjectId(args.id),
        client_id: new ObjectId(context.user.id),
      });
      return {
        ackandlodement:
          deleteProject.acknowledged && deleteProject.deletedCount === 1,
        _id: args.id,
      };
    },
  },
};
