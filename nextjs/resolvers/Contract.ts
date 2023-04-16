import { ObjectId } from "mongodb";
import db from "../lib/mongodb";
import { Contract, ContractStatus, Project, Resolvers } from "../types/resolvers.d";
import { GraphQLError } from "graphql";
import { clientMiddleware } from "./resolversHelpersFunctions/clientMiddleware";
import { freelancerMiddleware } from "./resolversHelpersFunctions/freelancerMiddleware";

const contractCollection = db.collection("contract")
const projectsCollection = db.collection("projects")
const proposalsCollection = db.collection("proposals")

export const ContractResolvers: Resolvers = {
    Query: {
        Contract:
            async (parent, args, context, info) => {
                //? the client have access related to him project
                //? the freelance have access only to his proposal.. 
                // to add scrolling pagination 
                if (!context.user) throw new GraphQLError("You must be authenticated to access this resource",
                    {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                            http: { status: 401 },
                        },
                    }
                )
                //? you must be authenticated to access this resource
                //? you must know the id of the contract to access it
                //? you must be the client or the freelancer of the contract to access it
                const contract = await contractCollection.findOne({ $and: [{ _id: new ObjectId(args.id) }, { $or: [{ client_id: new ObjectId(context.user.id) }, { freelancer_id: new ObjectId(context.user.id) }] }] })
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
            const project = await projectsCollection.findOne({ _id: new ObjectId(args.project_id), client_id: new ObjectId(context.user.id) }) as unknown as Project | null
            if (!project) throw new GraphQLError("The project no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: { status: 404 },
                    },
                });
            // check if the proposal exits
            const proposal = await proposalsCollection.findOne({ _id: new ObjectId(args.proposal_id), project_id: new ObjectId(project._id), freelancer_id: new ObjectId(args.freelancer_id) }) as unknown as Project | null
            if (!proposal) throw new GraphQLError("The proposal no longer exists",

                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: { status: 404 },
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
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const insertedContract = await contractCollection.insertOne(contract);
            if (!insertedContract.acknowledged) throw new GraphQLError("An error has occurred ",

                {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        http: { status: 500 },
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
            const updateContract = contractCollection.findOneAndUpdate({ _id: new ObjectId(args.id), freelancer_id: new Object(context.user.id) }, { $set: { status: ContractStatus.Accepted } }, {
                returnDocument: "after"
            }) as unknown as Contract;

            return updateContract;
        },
        cancelContract: async (parent, args, context, info) => {
            // the contract status is cancled
            // you must be a freelancer to accept a contract that is created by a client
            freelancerMiddleware(context)

            // @ts-ignore
            const updateContract = contractCollection.findOneAndUpdate({ _id: new ObjectId(args.id), freelancer_id: new Object(context.user.id) }, { $set: { status: ContractStatus.Cancelled } }, {
                returnDocument: "after"
            }) as unknown as Contract;

            return updateContract;
        },
        completeContract: async (parent, args, context, info) => {
            // the contract status is cancled
            // you must be a freelancer to accept a contract that is created by a client
            clientMiddleware(context)
            // todo check if client pays for the contract 
            // @ZenaguiAnas (we should add a payment here)

            // @ts-ignore
            const updateContract = contractCollection.findOneAndUpdate({ _id: new ObjectId(args.id), client_id: new Object(context.user.id) }, { $set: { status: ContractStatus.Completed } }, {
                returnDocument: "after"
            }) as unknown as Contract;

            return updateContract;

        }
    }
}