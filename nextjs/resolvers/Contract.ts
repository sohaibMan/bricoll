import { ObjectId} from "mongodb";
import db from "../lib/mongodb";
import {
    Contract,
    ContractStatus,
    Project, Proposal_Status,
    Resolvers, Submission_Review, SubmissionReviewStatus
} from "../types/resolvers";
import {GraphQLError} from "graphql";
import {clientMiddleware} from "./resolversHelpersFunctions/clientMiddleware";
import {freelancerMiddleware} from "./resolversHelpersFunctions/freelancerMiddleware";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const contractCollection = db.collection("contract")
const projectsCollection = db.collection("projects")
const proposalsCollection = db.collection("proposals")
const usersCollection = db.collection("users")

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
                // index scan
                const contract = await contractCollection.findOne({$and: [{_id: new ObjectId(args.id)}, {$or: [{client_id: new ObjectId(context.user.id)}, {freelancer_id: new ObjectId(context.user.id)}]}]})
                if(!contract) throw new GraphQLError("The contract no longer exists",
                    {
                        extensions: {
                            code: 'NOTFOUND',
                            http: {status: 404},
                        }
                    }
                )
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
            const proposal= await proposalsCollection.findOneAndUpdate({
                    _id: new ObjectId(args.proposal_id),
                    project_id: new ObjectId(project._id),
                    freelancer_id: new ObjectId(args.freelancer_id)
                },
                {
                    $set: {
                        status: Proposal_Status.Completed,
                    },
                }
            )

            if (!proposal.value) throw new GraphQLError("The proposal no longer exists",

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
                fees: args.price * 0.05, // 5% of the price for the platform fees (both client and freelancer will pay 5% of the price)
                // further explanation about the fees
                // the client will pay 5% of the price to the platform (price + fees = 105% of the price)
                // the freelancer will pay 5% of the price to the platform (price - fees = 95% of the price)
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
                    _id: new ObjectId(args.contract_id),
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

            const contract = await contractCollection.findOneAndUpdate(
                {
                    _id: new ObjectId(args.contract_id),
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
                },
                {
                    returnDocument: "after"
                }
            )
            if (contract.ok === 0 || !contract.value) throw new GraphQLError("The contract no longer exists", {
                extensions: {
                    code: 'NOTFOUND',
                    http: {status: 404},
                }
            })
            //todo the client should receive a payment request
            // check if the client has an account(already paid for a project)
            let account;
            try {
                account = await stripe.accounts.retrieve(context.user?.id);
            } catch (e) {
                // create an account for the client (if it doesn't exist)
                account = await stripe.accounts.create({
                    type: 'express',
                    id: context.user?.id
                });

                const accountLink = await stripe.accountLinks.create({
                    account: context.user?.id,
                    // refresh_url: process.env.STRIPE_REDIRECT_URL,
                    return_url: process.env.NEXTAUTH_URL,
                    type: 'account_onboarding',
                });
                // todo send the client a link to complete his account and save the link in the database

                const freelancer = await usersCollection.updateOne({_id: new ObjectId(context.user?.id)}, {
                        $set: {
                            account_link: accountLink.url

                        },
                        $push: {
                            earnings: {
                                contract_id: args.contract_id,
                                amount: contract.value.price * 100 - contract.value.fees,
                                created_at: new Date(),
                                currency: "usd",
                            }
                        }
                    }
                )
            }


            const transfer = await stripe.transfers.create({
                amount: contract.value.price * 100 - contract.value.fees,
                currency: "usd",
                destination: context.user?.id,
            })


            // contract_id: args.contract_id,
            // submission_review_id: args.submission_review_id,

            return {
                acknowledgement: contract.ok === 1,
                _id: args.submission_review_id
            }

        },
        declineRequestProjectSubmissionReview: async (parent, args, context, info) => {
            clientMiddleware(context);
            const contract = await contractCollection.updateOne(
                {
                    _id: new ObjectId(args.contract_id),
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
                    _id: new ObjectId(args.contract_id),
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