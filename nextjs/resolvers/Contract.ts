import {ObjectId} from "mongodb";
import db from "../lib/mongodb";
import {
    Contract,
    ContractStatus,
    Project,
    Resolvers, Submission_Review, SubmissionReviewStatus
} from "../types/resolvers";
import {GraphQLError} from "graphql";
import {clientMiddleware} from "./resolversHelpersFunctions/clientMiddleware";
import {freelancerMiddleware} from "./resolversHelpersFunctions/freelancerMiddleware";

const contractCollection = db.collection("contract")
const projectsCollection = db.collection("projects")
const proposalsCollection = db.collection("proposals")

export const ContractResolvers: Resolvers = {
    Query: {
        Contract:
            async (parent, args, context, info) => {
                //? the client have access related to him project
                //? the freelance have access only to his proposal
                // to add scrolling pagination
                if (!context.user) throw new GraphQLError("You must be authenticated to access this resource",
                    {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                            http: {status: 401},
                        },
                    }
                )
                //? you must be authenticated to access this resource
                //? you must know the id of the contract to access it
                //? you must be the client or  freelancer of the contract to access it
                const contract = await contractCollection.findOne({$and: [{_id: new ObjectId(args.id)}, {$or: [{client_id: new ObjectId(context.user.id)}, {freelancer_id: new ObjectId(context.user.id)}]}]})
                return contract as unknown as Contract;
            },
    },
    Mutation: {
        createContract: async (parent, args, context, info) => {
            // the contract status is Pending( by client)
            //? you must be authenticated to access this resource
            //? you should be a client to access this resource
            clientMiddleware(context);
            // check if the project exits
            // @ts-ignore
            const project = await projectsCollection.findOne({
                _id: new ObjectId(args.project_id),
                // @ts-ignore
                client_id: new ObjectId(context.user.id)
            }) as unknown as Project | null
            if (!project) throw new GraphQLError("The project no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: {status: 404},
                    },
                });
            // check if the proposal exits
            const proposal = await proposalsCollection.findOne({
                _id: new ObjectId(args.proposal_id),
                project_id: new ObjectId(project._id),
                freelancer_id: new ObjectId(args.freelancer_id)
            }) as unknown as Project | null
            if (!proposal) throw new GraphQLError("The proposal no longer exists",

                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: {status: 404},
                    },
                });

            const contract: Contract = {
                _id: new ObjectId(),
                freelancer_id: new ObjectId(args.freelancer_id),
                project_id: new ObjectId(args.project_id),
                proposal_id: new ObjectId(args.proposal_id),
                status: ContractStatus.Pending,
                // @ts-ignore
                client_id: new ObjectId(context.user.id),
                duration: args.duration,
                price: args.price,
                created_at: new Date(),
                updated_at: new Date(),
                submission_reviews: [],
                terms: args.terms,
            }
            const insertedContract = await contractCollection.insertOne(contract);
            if (!insertedContract.acknowledged) throw new GraphQLError("An error has occurred ",

                {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        http: {status: 500},
                    },
                },
            )

            return contract;

        },
        acceptContract: async (parent, args, context, info) => {
            // the contract status is accepted (by freelancer)
            // you must be a freelancer to accept a contract that is created by a client
            freelancerMiddleware(context)
            console.log(context.user?.id)
            console.log(args.id);
            // @ts-ignore
            const updatedContract = await contractCollection.findOneAndUpdate({
                _id: new ObjectId(args.id),
                // @ts-ignore
                freelancer_id: new ObjectId(context.user.id),
                updated_at: new Date()
            }, {$set: {status: ContractStatus.Accepted}}, {
                returnDocument: "after"
            });

            if (updatedContract.lastErrorObject?.updatedExisting === false) throw new Error("The Contract no longer exists");
            //return the value (the updated proposal)
            return updatedContract.value as unknown as Contract;

        },
        cancelContract: async (parent, args, context, info) => {
            // the contract status is canceled
            // you must be a freelancer to accept a contract that is created by a client
            freelancerMiddleware(context)

            const updatedContract = await contractCollection.findOneAndUpdate({
                _id: new ObjectId(args.id),
                // @ts-ignore
                freelancer_id: new ObjectId(context.user.id),
                updated_at: new Date()
            }, {$set: {status: ContractStatus.Cancelled}}, {
                returnDocument: "after"
            });
            if (updatedContract.lastErrorObject?.updatedExisting === false) throw new Error("The updatedContract no longer exists");
            //return the value (the updated proposal)
            return updatedContract.value as unknown as Contract;
        },
        //     completeContract: async (parent, args, context, info) => {
        // moved to a rest endpoint because it needs some redirection and strip integration
        //         // the contract status is
        //         // you must be a freelancer to accept a contract that is created by a client
        //         clientMiddleware(context)
        //         // @ts-ignore
        //         // get a contract of the user that is not accepted by the freelancer (the client can't complete a contract that is not accepted by the freelancer)
        //         //  the contract can be completed only if its status is accepted not pending or cancelled or completed
        //         const contract = await contractCollection.findOne({
        //             _id: new ObjectId(args.id),
        //             // @ts-ignore
        //             // client_id: new Object(context.user.id),
        //             status: {$nin: [ContractStatus.Accepted]}  // pending or cancelled or completed
        //         }) as unknown as Contract | null
        //
        //         if (contract) throw new GraphQLError("The contract can't be completed because it is" + contract.status, {
        //             extensions: {
        //                 code: 'BAD_REQUEST',
        //                 http: {status: 400},
        //             }
        //         })
        //     //     the freelancer has accepted the contract now the client can complete the contract if he pays for it
        //
        //     // programmatically create a product so the client has pays for it
        //     //  check if client pays for the contract
        //
        //     // @ZenaguiAnas (we should add a payment here)
        //
        //     // @ts-ignore
        //     // return  await contractCollection.findOneAndUpdate({
        //     //     _id: new ObjectId(args.id),
        //     //     // @ts-ignore
        //     //     client_id: new Object(context.user.id)
        //     // }, {$set: {status: ContractStatus.Completed}}, {
        //     //     returnDocument: "after"
        //     // }) as unknown as Contract;
        //
        //
        // }
// }
        requestProjectSubmissionReview: async (parent, args, context, info) => {
            //     rules : only client can request a review
            //     rules : the contract status must be completed
            //     rules : the contract must be paid
            // the freelancer can send multiple requests for review (for example multiple versions of the project)
            freelancerMiddleware(context);

            const submission_review: Submission_Review = {
                _id: new ObjectId(),
                created_at: new Date(),
                updated_at: new Date(),
                attachments: args.attachments,
                description: args.description,
                title: args.title,
                status: SubmissionReviewStatus.Pending,
            }
            const contract = await contractCollection.updateOne({
                    _id: new ObjectId(args.project_id),
                    // @ts-ignore
                    freelancer_id: new ObjectId(context.user.id),
                    status: ContractStatus.Completed,
                },
                {
                    $push: {
                        submission_reviews: submission_review
                    }

                })
            if (contract.matchedCount === 0) throw new GraphQLError("The contract no longer exists", {
                extensions: {
                    code: 'NOTFOUND',
                    http: {status: 404},
                }
            })
            return {
                acknowledgement: contract.upsertedCount === 1,
                _id: submission_review._id
            };
        },
        acceptRequestProjectSubmissionReview: async (parent, args, context, info) => {
            clientMiddleware(context);
            // because we will handle payment here the client can accept only one submission review

            const contract = await contractCollection.updateOne(
                {
                    _id: new ObjectId(args.project_id),
                    // @ts-ignore
                    client_id: new ObjectId(context.user.id),
                    "submission_reviews._id": new ObjectId(args.submission_review_id),
                    "submission_reviews.status": SubmissionReviewStatus.Pending,
                    status: ContractStatus.Completed,
                },
                {
                    $set: {
                        "submission_reviews.$.status": SubmissionReviewStatus.Accepted,
                        "submission_reviews.$.updated_at": new Date(),
                        "submission_reviews.$.accepted_at": new Date(),
                        "status": ContractStatus.Paid,
                    }
                }
            )
            if (contract.matchedCount === 0) throw new GraphQLError("The contract no longer exists", {
                extensions: {
                    code: 'NOTFOUND',
                    http: {status: 404},
                }
            })
            // the client should receive a payment request

            return {
                acknowledgement: contract.upsertedCount === 1,
                _id: args.submission_review_id
            }

        },
        declineRequestProjectSubmissionReview: async (parent, args, context, info) => {
            clientMiddleware(context);
            const contract = await contractCollection.updateOne(
                {
                    _id: new ObjectId(args.project_id),
                    // @ts-ignore
                    client_id: new ObjectId(context.user.id),
                    "submission_reviews._id": new ObjectId(args.submission_review_id),
                    "submission_reviews.status": SubmissionReviewStatus.Pending,
                    status: ContractStatus.Completed,
                },
                {
                    $set: {
                        "submission_reviews.$.status": SubmissionReviewStatus.Declined,
                        "submission_reviews.$.updated_at": new Date(),
                    }
                }
            )
            if (contract.matchedCount === 0) throw new GraphQLError("The contract no longer exists", {
                extensions: {
                    code: 'NOTFOUND',
                    http: {status: 404},
                }
            })

            return {
                acknowledgement: contract.upsertedCount === 1,
                _id: args.submission_review_id
            }

        },
        cancelRequestProjectSubmissionReview: async (parent, args, context, info) => {
            freelancerMiddleware(context);
            const contract = await contractCollection.updateOne(
                {
                    _id: new ObjectId(args.project_id),
                    // @ts-ignore
                    freelancer_id: new ObjectId(context.user.id),
                    "submission_reviews._id": new ObjectId(args.submission_review_id),
                    "submission_reviews.status": SubmissionReviewStatus.Pending
                },
                {
                    $set: {
                        "submission_reviews.$.status": SubmissionReviewStatus.Cancelled,
                        "submission_reviews.$.updated_at": new Date(),
                    }
                }
            )
            if (contract.matchedCount === 0) throw new GraphQLError("The contract no longer exists", {
                extensions: {
                    code: 'NOTFOUND',
                    http: {status: 404},
                }
            })

            return {
                acknowledgement: contract.upsertedCount === 1,
                _id: args.submission_review_id
            }

        }


    }
}