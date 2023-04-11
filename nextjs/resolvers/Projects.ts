import { Project, Proposal, Resolvers } from "../types/resolvers.d";
import { ObjectId } from 'mongodb';
import db from "../lib/mongodb";
import { GraphQLError } from "graphql";
import { ServerContext } from "../types/server-context";
import { clientMiddleware } from "./resolversHelpersFunctions/clientMiddleware";
import { freelancerMiddleware } from "./resolversHelpersFunctions/freelancerMiddleware";
const projectsCollection = db.collection("projects")
const proposalsCollection = db.collection("proposals")

export const ProjectResolvers: Resolvers = {
    Query: {
        Projects:
            async (parent, args, context, info) => {
                // to add scrolling pagination 
                // ? public 
                const projects = await projectsCollection.aggregate([{ $sample: { size: 20 } }]).toArray()
                return projects as Project[];
            },
        Project: async (parent, args, context, info) => {
            // ? private 
            const project = await projectsCollection.findOne({ _id: new ObjectId(args.id) });
            if (!project) throw new GraphQLError("There is no project with this Id",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: { status: 404 },
                    },
                });
            return project as Project;
        }
    },
    Project: {
        // one (resolvers chaine)
        proposals: async (parent) => {
            // many 
            const proposals = await proposalsCollection.find({ project_id: new ObjectId(parent._id) }).toArray();
            return proposals as unknown as Proposal[];
        }
    },
    Mutation: {
        addProject: async (parent, args, context, info) => {
            // ? private 
            // only the account of type client can add a project
            clientMiddleware(context);// it throws an error if the user is not authenticated as client


            const project: Project = {
                ...args,
                // because I've used the middleware function that will throw an error if the context.user is null which not inferred by typescript
                // @ts-ignore
                client_id: new ObjectId(context.user.id),
                reactions: {
                    love: 0,
                    dislike: 0,
                },
                created_at: new Date(),
            }
            const insertedProject = await projectsCollection.insertOne(project);
            return insertedProject.acknowledged ? project : null;
        },
        editProject: async (parent, args, context: ServerContext, info) => {
            // private 
            // the owner of the project can edit it
            clientMiddleware(context);
            const updateProject = await projectsCollection.findOneAndUpdate(
                // because I've used the middleware function that will throw an error if the context.user is null which not inferred by typescript
                // @ts-ignore
                { _id: new ObjectId(args.id), client_id: new ObjectId(context.user.id) },
                {
                    $set: {
                        ...args
                    }
                }
                , {
                    returnDocument: "after"
                }
            )
            return updateProject as unknown as Project;
        },
        deleteProject: async (parent, args, context, info) => {
            // todo ;add a check if the user is the owner of the project
            // todo : check is the project active ...(has contracts)
            // before deleting the project we should delete all the proposals related to it 
            // private
            clientMiddleware(context);
            // @ts-expect-error
            const deleteProject = await projectsCollection.deleteOne({ _id: new ObjectId(args.id), client_id: new ObjectId(context.user.id) })
            return {
                ackandlodement: deleteProject.acknowledged && deleteProject.deletedCount === 1,
                _id: args.id
            }
        },
        loveProject: async (parent, args, context, info) => {
            // private 
            // only the account of type freelancer can love a project
            freelancerMiddleware(context);
            const project = await projectsCollection.updateOne(
                { _id: new ObjectId(args.id) },
                {
                    $inc: {
                        "reactions.love": 1
                    }
                }

            )
            return { _id: args.id, ackandlodement: project.acknowledged }
        },
        dislikeProject: async (parent, args, context, info) => {
            // private 
            // only the account of type freelancer can dislike a project
            freelancerMiddleware(context);
            const project = await projectsCollection.updateOne(
                { _id: new ObjectId(args.id) },
                {
                    $inc: {
                        "reactions.dislike": 1
                    }
                }

            )
            return { _id: args.id, ackandlodement: project.acknowledged }
        },
        unLoveProject: async (parent, args, context, info) => {
            // private 
            // only the account of type freelancer can love a project
            freelancerMiddleware(context);
            const project = await projectsCollection.updateOne(
                { _id: new ObjectId(args.id) },
                {
                    $inc: {
                        "reactions.love": -1
                    }
                }

            )
            return { _id: args.id, ackandlodement: project.acknowledged }
        },
        unDislikeProject: async (parent, args, context, info) => {
            // private 
            // only the account of type freelancer can dislike a project
            freelancerMiddleware(context);
            const project = await projectsCollection.updateOne(
                { _id: new ObjectId(args.id) },
                {
                    $inc: {
                        "reactions.dislike": -1
                    }
                }

            )
            return { _id: args.id, ackandlodement: project.acknowledged }
        }

    }
}