import {ObjectId, TransactionOptions} from "mongodb";
import db, {clientPromise} from "../../../../lib/mongodb";
import {
    Contract,
    ContractStatus,
    EarningsStatus,
    Proposal_Status,
    Resolvers,
    Submission_Review,
    SubmissionReviewStatus,
    UserRole
} from "../../../../types/resolvers";
import {GraphQLError} from "graphql";
import {clientMiddleware} from "./resolversHelpersFunctions/clientMiddleware";
import {freelancerMiddleware} from "./resolversHelpersFunctions/freelancerMiddleware";
import {authenticatedMiddleware} from "./resolversHelpersFunctions/authenticatedMiddleware";

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
                if (!contract) throw new GraphQLError("The contract no longer exists",
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
        acceptContract: async (parent, args, context, info) => {
            // the contract status is accepted (by freelancer)
            // you must be a freelancer to accept a contract that is created by a client
            freelancerMiddleware(context)
            // @ts-ignore
            const updatedContract = await contractCollection.findOneAndUpdate({
                _id: new ObjectId(args.id),
                // @ts-ignore
                freelancer_id: new ObjectId(context.user.id),

            }, {$set: {status: ContractStatus.Accepted, updated_at: new Date()}}, {
                returnDocument: "after"
            });

            if (updatedContract.lastErrorObject?.updatedExisting === false) throw new Error("The Contract no longer exists");
            //return the value (the updated proposal)
            return updatedContract.value as unknown as Contract;

        },
        cancelContract: async (parent, args, context, info) => {
            // both the client and the freelancer can cancel the contract
            authenticatedMiddleware(context)

            const updatedContract = await contractCollection.findOneAndUpdate({
                $and: [{_id: new ObjectId(args.id)}, {$or: [{client_id: new ObjectId(context.user?.id)}, {freelancer_id: new ObjectId(context.user?.id)}]}]
            }, {
                $set: {
                    status: context.user?.userRole === UserRole.Client ? ContractStatus.CancelledByClient : ContractStatus.CancelledByFreelancer,
                    updated_at: new Date()
                }
            }, {
                returnDocument: "after"
            });
            if (updatedContract.lastErrorObject?.updatedExisting === false) throw new Error("The updatedContract no longer exists");
            //return the value (the updated proposal)
            return updatedContract.value as unknown as Contract;
        },
        createContract: async (parent, args, context, info) => {
            // the contract status is Pending( by client)
            //? you must be authenticated to access this resource
            //? you should be a client to access this resource
            clientMiddleware(context);
            // check if a contract already exists
            // the same freelancer and the same project and the same proposal and the same client are not allowed to have more than one contract and pending they may create another one after changing the status of the first one\
            // index on project id
            const AnExistingContract = await contractCollection.findOne({$and: [{project_id: new ObjectId(args.project_id)}, {freelancer_id: new ObjectId(args.freelancer_id)}, {proposal_id: new ObjectId(args.proposal_id)}, {client_id: new ObjectId(context.user?.id)}, {status: ContractStatus.Pending}]}, {projection: {_id: 1}})
            if (AnExistingContract) throw new GraphQLError("You already have a pending contract with this freelancer on this project please complete it first",
                {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        http: {status: 400},
                    }
                }
            )
            // check if the project exits
            // @ts-ignore
            const project = await projectsCollection.findOne({
                _id: new ObjectId(args.project_id),
                // @ts-ignore
                client_id: new ObjectId(context.user.id)
            }, {projection: {_id: 1}})
            if (!project) throw new GraphQLError("The project no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: {status: 404},
                    },
                });
            // check if the proposal exits
            const proposal = await proposalsCollection.updateOne({
                    _id: new ObjectId(args.proposal_id),
                    project_id: new ObjectId(args.project_id),
                    freelancer_id: new ObjectId(args.freelancer_id)
                },
                {
                    $set: {
                        status: Proposal_Status.Completed,
                    },
                }
            )

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
                attachments: args.attachments || [],
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
            // irreversible action (idempotent request) (status change from completed to paid once and only once)
            // this transaction is acid (atomicity, consistency, isolation, durability) (all or nothing) complain
            const session = (await clientPromise).startSession();
            const transactionOptions: TransactionOptions = {
                readPreference: 'primary',
                readConcern: {level: "local"},
                writeConcern: {w: 'majority'}
            };
            session.startTransaction(transactionOptions);
            // const transactionResults = await session.withTransaction(async () => {
            // }, transactionOptions);
            try {
                const contract = await contractCollection.findOneAndUpdate(
                    {
                        $and: [
                            {_id: new ObjectId(args.contract_id)},
                            {client_id: new ObjectId(context.user?.id)},
                            {status: ContractStatus.Completed},
                            {
                                submission_reviews:
                                    {
                                        $elemMatch: {
                                            "_id": new ObjectId(args.submission_review_id),
                                            "status": SubmissionReviewStatus.Pending
                                        }
                                    }
                            }

                        ]
                    },
                    {
                        $set: {
                            "submission_reviews.$.status":
                            SubmissionReviewStatus.Accepted,
                            "submission_reviews.$.updated_at": new Date(),
                            "status": ContractStatus.Paid,
                        }
                    },
                    {
                        returnDocument: "after",
                        session
                    }
                )
                // console.log(contract)
                if (contract.ok === 0 || !contract.value) throw new Error("The contract no longer exists");


                const freelancer = await usersCollection.updateOne({_id: contract.value.freelancer_id}, {
                        $push: {
                            earnings: {
                                contract_id: new ObjectId(args.contract_id),
                                amount: contract.value.price - contract.value.fees,
                                created_at: new Date(),
                                currency: "usd",
                                description: "Payment for the contract " + args.contract_id,
                                status: EarningsStatus.Pending,
                            }
                        }
                    },
                    {session}
                )
                if (freelancer.modifiedCount !== 1) {
                    //rol back if the freelancer is not found
                    throw new Error("An error has occurred while updating the freelancer earnings")
                }


            } catch (e: any) {
                // console.log(e)
                await session.abortTransaction();
                throw  new GraphQLError(e.message, {
                    extensions: {
                        code: 'BAD_REQUEST',
                        http: {status: 400},
                    }
                });
            } finally {


                // return {
                //     acknowledgement: !!transactionResults,
                //     _id: args.submission_review_id
                // }

            }
            // console.log(transactionResults)
            await session.commitTransaction();
            await session.endSession();
            return {
                acknowledgement: true,
                _id: args.submission_review_id
            }


        },
        declineRequestProjectSubmissionReview: async (parent, args, context, info) => {
            clientMiddleware(context);
            const contract = await contractCollection.updateOne(
                {
                    $and: [
                        {_id: new ObjectId(args.contract_id)},
                        {client_id: new ObjectId(context.user?.id)},
                        {status: ContractStatus.Completed},
                        {
                            submission_reviews:
                                {
                                    $elemMatch: {
                                        "_id": new ObjectId(args.submission_review_id),
                                        "status": SubmissionReviewStatus.Pending
                                    }
                                }
                        }

                    ]
                },
                {
                    $set: {
                        "submission_reviews.$.status":
                        SubmissionReviewStatus.Declined,
                        "submission_reviews.$.updated_at":
                            new Date()
                    }
                }
            )
            if (contract.matchedCount === 0) throw new GraphQLError("The contract no longer exists or your request already treated", {
                extensions: {
                    code: 'NOTFOUND',
                    http: {status: 404},
                }
            })

            return {
                acknowledgement: contract.modifiedCount === 1,
                _id: args.submission_review_id
            }

        },
        cancelRequestProjectSubmissionReview: async (parent, args, context, info) => {
            freelancerMiddleware(context);
            const contract = await contractCollection.updateOne(
                {
                    $and: [
                        {_id: new ObjectId(args.contract_id)},
                        {freelancer_id: new ObjectId(context.user?.id)},
                        {status: ContractStatus.Completed},
                        {
                            submission_reviews:
                                {
                                    $elemMatch: {
                                        "_id": new ObjectId(args.submission_review_id),
                                        "status": SubmissionReviewStatus.Pending
                                    }
                                }
                        }

                    ]
                },
                {
                    $set: {
                        "submission_reviews.$.status":
                        SubmissionReviewStatus.Cancelled,
                        "submission_reviews.$.updated_at":
                            new Date(),
                        "submission_reviews.$.cancelled_at":
                            new Date(),
                    }
                }
            )
            if (contract.matchedCount === 0) throw new GraphQLError("The contract no longer exists or your request already treated", {
                extensions: {
                    code: 'NOTFOUND',
                    http: {status: 404},
                }
            })
            // console.log(contract)

            return {
                acknowledgement: contract.modifiedCount === 1,
                _id: args.submission_review_id
            }

        }


    }
}