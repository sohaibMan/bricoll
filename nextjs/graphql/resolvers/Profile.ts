import db from "../../lib/mongodb";
import {
    Contract,
    Contract_Stats,
    Contract_Status,
    Project,
    Proposal,
    Proposals_Stats,
    Resolvers,
    Review,
    User,
    UserRole,
} from "../../types/resolvers";
import {authenticatedMiddleware} from "./resolversHelpersFunctions/authenticatedMiddleware";
import {ObjectId} from "mongodb";

const users = db.collection("users");
const proposals = db.collection("proposals");
const projects = db.collection("projects");
const contracts = db.collection("contracts");
export const ProfileResolvers: Resolvers = {
    Query: {
        ProfileById: async (parent, args, context, info) => {
            console.log("context: ", context);
            authenticatedMiddleware(context);

            return await users.findOne({
                _id: new ObjectId(args.id),
            }) as unknown as User;
        },
        Profile: async (parent, args, context, info) => {
            // console.log(context)
            authenticatedMiddleware(context);

            return await users.findOne({
                _id: new ObjectId(context.user?.id),
            }) as unknown as User;
        },
    },
    User: {
        proposals: async (parent, args, context, info) => {
            return await proposals
                .find({
                    $or: [
                        {client_id: new ObjectId(context.user?.id)},
                        {freelancer_id: new ObjectId(context.user?.id)},
                    ],
                })
                .limit(20).toArray() as unknown as [Proposal];
        },
        projects: async (parent, args, context, info) => {
            // clientMiddleware(context);
            if (context.user?.userRole === UserRole.Freelancer) return []; // the users has no projects

            return await projects
                .find({
                    client_id: new ObjectId(context.user?.id),
                })
                .limit(20).toArray() as unknown as [Project]; // Todo: fixing the pagination limit

        },
        contracts: async (parent, args, context, info) => {
            return await contracts
                .find({
                    $or: [
                        {client_id: new ObjectId(context.user?.id)},
                        {freelancer_id: new ObjectId(context.user?.id)},
                    ],
                })
                .limit(20).toArray() as unknown as [Contract];
        },
        proposals_stats: async (parent, args, context, info) => {
            const proposalsStats = await proposals.aggregate([
                {
                    $match: {
                        $or: [
                            {client_id: new ObjectId(context.user?.id)},
                            {freelancer_id: new ObjectId(context.user?.id)},
                        ],
                    },
                },
                {
                    $group: {
                        _id: "$status",
                        count: {
                            $sum: 1,
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        status: "$_id",
                        count: 1,
                    }
                }
            ]).toArray()


            return {
                proposalsStats
            } as unknown as [Proposals_Stats]
        },
        contracts_stats: async (parent, args, context, info) => {
            const contractsStats = await contracts.aggregate([
                {
                    $match: {
                        $or: [
                            {client_id: new ObjectId(context.user?.id)},
                            {freelancer_id: new ObjectId(context.user?.id)},
                        ],
                    },
                },
                {
                    $group: {
                        _id: "$status",
                        count: {
                            $sum: 1,
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        status: "$_id",
                        count: 1,
                    }
                }
            ]).toArray() as unknown as [{ status: Contract_Status; count: number }];


            return {
                contractsStats
            } as unknown as [Contract_Stats]
        },

    },

    Mutation: {
        addReview: async (parent, args, context, info) => {


            // const users = users.findOne({_id: })
            // client_id = (context.users?.userRole === "Client") ? context.users?.

            authenticatedMiddleware(context);

            const review: Review = {
                _id: new ObjectId(),
                reviewer_id: new ObjectId(context.user?.id),
                project_id: new ObjectId(args.project_id),
                description: args.description,
                rating: args.rating,
                createdAt: Date.now()
            }

            await users.updateOne({_id: new ObjectId(args.user_id)}, {
                $push: {
                    reviews: review
                }
            })
            return {
                acknowledgement: true,
                _id: review._id
            }


        },
        editReview: async (parent, args, context, info) => {
            authenticatedMiddleware(context);

            const review: Review = {
                _id: new ObjectId(args.id),
                reviewer_id: new ObjectId(context.user?.id),
                project_id: new ObjectId(args.project_id),
                description: args.description,
                rating: args.rating,
                createdAt: Date.now()
            }

            await users.updateOne({_id: new ObjectId(context.user?.id), "reviews._id": new ObjectId(args.id)}, {
                $set: {
                    "reviews.$.description": args.description,
                    "reviews.$.rating": args.rating,
                }
            })


            return {
                acknowledgement: true,
                _id: args.id
            }
        },
        removeReview: async (parent, args, context, info) => {

            authenticatedMiddleware(context);

            await users.updateOne({_id: new ObjectId(context.user?.id)}, {
                $unset: {
                    "reviews._id": new ObjectId(args.id)
                }
            })
            return {
                acknowledgement: true,
                _id: args.id
            }
        }

    }

};
