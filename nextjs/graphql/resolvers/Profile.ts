import db from "../../lib/mongodb";
import {
    Contract,
    Contract_Stats,
    Contract_Status,
    Project,
    Project_Stats_Per_Month,
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
        ProfileById: async (parent, args, context, _) => {
            // we're going to make this public
            // authenticatedMiddleware(context);
            // let  user=await redis.get()
            // the project is necessary to  prevent data leaks
            const user = await users.findOne({
                _id: new ObjectId(args.id),
                isCompleted: true
            }, {
                projection: {
                    username: 1,
                    email: 1,
                    image: 1,
                    phone: 1,
                    address: 1,
                    jobTitle: 1,
                    skills: 1,
                    portfolio: 1,
                    bio: 1,
                    reviews: 1
                }
            }) as unknown as User;

            return user;
        },
        Profile: async (parent, args, context, _) => {
            // console.log(context)
            authenticatedMiddleware(context);

            return await users.findOne({
                _id: new ObjectId(context.user?.id),
            }) as unknown as User;
        },
    },
    User: {
        proposals: async (parent, args, context, _) => {
            return await proposals
                .find({
                    $or: [
                        {client_id: new ObjectId(context.user?.id)},
                        {freelancer_id: new ObjectId(context.user?.id)},
                    ],
                })
                .limit(20).toArray() as unknown as [Proposal];
        },
        projects: async (parent, args, context, _) => {
            // clientMiddleware(context);
            if (context.user?.userRole === UserRole.Freelancer) return []; // the users has no projects

            return await projects
                .find({
                    client_id: new ObjectId(context.user?.id),
                })
                .limit(20).toArray() as unknown as [Project]; // Todo: fixing the pagination limit

        },
        contracts: async (parent, args, context, _) => {
            return await contracts
                .find({
                    $or: [
                        {client_id: new ObjectId(context.user?.id)},
                        {freelancer_id: new ObjectId(context.user?.id)},
                    ],
                })
                .limit(20).toArray() as unknown as [Contract];
        },
        proposals_stats: async (parent, args, context, _) => {
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
        contracts_stats: async (parent, args, context, _) => {
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
        projects_stats: async (parent, args, context, _) => {
            if (context.user?.userRole === UserRole.Freelancer) return []
            const aggregation = [{
                $match: {
                    client_id: new ObjectId(
                        context.user?.id
                    ),
                },
            },
                {
                    $group: {
                        _id: {$month: "$created_at"},
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        count: 1,
                        month: "$_id"
                    }
                }
            ]

            return await projects.aggregate(aggregation).toArray() as unknown as [Project_Stats_Per_Month]

        }

    },

    Mutation: {
        addReview: async (parent, args, context, _) => {


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
        editReview: async (parent, args, context, _) => {
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
        removeReview: async (parent, args, context, _) => {

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
