import {Project, Proposal, Resolvers} from "../types/resolvers";
import {ObjectId} from 'mongodb';
import db from "../lib/mongodb";
import {GraphQLError} from "graphql";
// import { ServerContext } from "../types/server-context";
import {clientMiddleware} from "./resolversHelpersFunctions/clientMiddleware";
import {freelancerMiddleware} from "./resolversHelpersFunctions/freelancerMiddleware";

const projectsCollection = db.collection("projects")
const proposalsCollection = db.collection("proposals")

export const ProjectResolvers: Resolvers = {
    Query: {
        Projects:
            async (parent, args, context, info) => {
                // to add scrolling pagination
                // ? public
                const projects = await projectsCollection.aggregate([{$sample: {size: 20}}]).toArray()
                return projects as Project[];
            },
        Project: async (parent, args, context, info) => {
            // ? private
            clientMiddleware(context);
            const project = await projectsCollection.findOne({
                _id: new ObjectId(args.id),
                client_id: new ObjectId(context.user?.id)
            });
            if (!project) throw new GraphQLError("There is no project with this Id",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: {status: 404},
                    },
                });
            return project as Project;
        }
    },
    Project: {
        // one (resolvers chaine)
        proposals: async (parent) => {
            // many
            // index scan on project_id
            const proposals = await proposalsCollection.find({project_id: new ObjectId(parent._id)}).toArray();
            return proposals as unknown as Proposal[];
        }
    },
    Mutation: {
        addProject: async (parent, args, context, info) => {
            // ? private
            // only the account of type client can add a project
            clientMiddleware(context);// it throws an error if the user is not authenticated as client


            const project: Project = {
                // ...args,
                title: args.title,
                description: args.description,
                price: args.price,
                skills: args.skills,
                // because I've used the middleware function that will throw an error if the context.user is null which not inferred by typescript
                // @ts-ignore
                client_id: new ObjectId(context.user.id),
                reactions: [],
                created_at: new Date(),
                category: args.category,

            }
            const insertedProject = await projectsCollection.insertOne(project);
            return insertedProject.acknowledged ? project : null;
        },
        editProject: async (parent, args, context, info) => {
            // private
            // the owner of the project can edit it
            clientMiddleware(context);
            const updateProject = await projectsCollection.findOneAndUpdate(
                // because I've used the middleware function that will throw an error if the context.user is null which not inferred by typescript
                // @ts-ignore
                {_id: new ObjectId(args.id), client_id: new ObjectId(context.user.id)},
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
            // if there is at least approved proposal you can't delete a project
            // index scan on project_id
            const proposals = await proposalsCollection.findOne({project_id: new ObjectId(args.id),client_id:new ObjectId(context.user?.id), status: "approved"})
            if (proposals) throw new GraphQLError("Can't delete this project because you have some approved proposals , please make them cancel first")


            const deleteProject = await projectsCollection.deleteOne({
                _id: new ObjectId(args.id),
                // @ts-expect-error
                client_id: new ObjectId(context.user.id)
            })
            return {
                acknowledgement: deleteProject.acknowledged && deleteProject.deletedCount === 1,
                _id: args.id
            }
        },
        reactToProject: async (parent, args, context, info) => {
            // private
            // only the account of type freelancer can love a project
            freelancerMiddleware(context);
            const project = await projectsCollection.updateOne(
                {_id: new ObjectId(args.id)},
                {
                    $addToSet: {
                        reactions: {
                            freelancer_id: new ObjectId(context.user?.id),
                            reaction_type: args.reaction_type
                        }
                    }
                }
            )
            return {_id: args.id, acknowledgement: project.modifiedCount === 1}
        },
        undoReactToProject: async (parent, args, context, info) => {
            // private
            // only the account of type freelancer can dislike a project
            // console.log(context.user?.id)
            // freelancerMiddleware(context);
            console.log(context.user?.id)
            const project = await projectsCollection.updateOne(
                {_id: new ObjectId(args.id)},
                {
                    $pull: {
                        reactions: {
                            freelancer_id: new ObjectId(context.user?.id),
                            reaction_type: args.reaction_type
                        }
                    }

                }
            )
            return {_id: args.id, acknowledgement: project.modifiedCount == 1}
        },
        searchProject: async (parent, args, context, info) => {
            const aggregation: any =
                [
                    {

                        $search: {
                            index: "default",
                            text: {
                                query: args.query,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    },

                ]

            if (args.filter?.category) aggregation.push({
                $match: {
                    "category": args.filter.category
                }
            })
            if (args.filter?.skills) aggregation.push({
                $match: {
                    "skills": {
                        $in: args.filter.skills
                    }
                }
            })
            if (args.filter?.priceMin) aggregation.push({
                $match: {
                    "price": {
                        $gte: args.filter.priceMin
                    }
                }
            })
            if (args.filter?.priceMax) aggregation.push({
                $match: {
                    "price": {
                        $lte: args.filter.priceMax
                    }
                }
            })


            return await projectsCollection.aggregate(aggregation).toArray() as unknown as Project[];
        }


    }
}