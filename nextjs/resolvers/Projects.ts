import {Project, ProjectStats, Proposal, Resolvers} from "../types/resolvers";
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
        Project: async (parent, args, context, info) => {
            // ? private
            // the client can get all details about his project
            if (!context.user) return null;

            const project = await projectsCollection.findOne({
                _id: new ObjectId(args.id),
            });
            if (!project) throw new GraphQLError("There is no project with this Id",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: {status: 404},
                    },
                });
            return project as Project;
        },
        Projects: async (parent, args, context, info) => {
            freelancerMiddleware(context);
            // if the user doesn't provide a query we will return 20 random projects
            if (!args.query) return await projectsCollection.aggregate([{$sample: {size: 20}}]).toArray() as Project[];
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
    },
    Project: {
        // one (resolvers chain)
        proposals: async (parent, args, context, info) => {
            // many
            // index scan on project_id
            // parent.
            const proposals = await proposalsCollection.find({$and: [{project_id: new ObjectId(parent._id)}, {$or: [{client_id: new ObjectId(context.user?.id)}, {freelancer_id: new ObjectId(context.user?.id)}]}]}).toArray();
            return proposals as unknown as Proposal[];
        },
        stats: async (parent) => {
            /*
        stats or the project based on the project id (parent._id)
        proposal_in_progress: Int! # the count of proposals that are in progress
        proposal_approved: Int! # the count of proposals that are approved
        hired_freelancer: Int!# the count of hired freelancers
        the project has an index on the project status which can be one of the following values () and on project id
        enum proposal_status {
       canceled
       declined
       in_progress
       approved
       completed # the proposal has a contract
       */
            const aggregation = [
                {
                    '$match': {
                        'project_id': new ObjectId(parent._id)
                    }
                }, {
                    '$group': {
                        '_id': '$status',
                        'status_count': {
                            '$sum': 1
                        }
                    }
                }
            ]
            const result = await proposalsCollection.aggregate(aggregation).toArray()
            // console.log(result)

            // declined_count: Int! # the count of proposals that are declined
            // hired_count: Int! # the count of proposals that are completed
            // approved_count: Int! # the count of proposals that are approved
            // in_progress_count: Int! #
            const stats: ProjectStats = {
                declined_count: result.filter((item) => item._id === "declined")[0]?.status_count || 0,
                completed_count: result.filter((item) => item._id === "completed")[0]?.status_count || 0,
                approved_count: result.filter((item) => item._id === "approved")[0]?.status_count || 0,
                in_progress_count: result.filter((item) => item._id === "in_progress")[0]?.status_count || 0,
            }
            return stats;

        }
    },
    Mutation: {
        createProject: async (parent, args, context, info) => {
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
                projectScope: args.projectScope,
                attachments: args.attachments || [],

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
            if (!updateProject.value) throw new GraphQLError("There is no project with this Id",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: {status: 404},
                    }
                }
            )
            return updateProject.value as unknown as Project;
        },
        deleteProject: async (parent, args, context, info) => {
            // todo ;add a check if the user is the owner of the project
            // todo : check is the project active ...(has contracts)
            // before deleting the project we should delete all the proposals related to it
            // private
            clientMiddleware(context);
            // if there is at least approved proposal you can't delete a project
            // index scan on project_id
            const proposals = await proposalsCollection.findOne({
                project_id: new ObjectId(args.id),
                client_id: new ObjectId(context.user?.id),
                status: "approved"
            })
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
            // console.log(context.user?.id)
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


    }
}