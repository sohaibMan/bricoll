// import { Proposal, Resolvers } from '../../../types/resolvers';

import { ObjectId } from 'mongodb';
import { Proposal, Proposal_Status, Resolvers } from "../types/resolvers.d";



import db from "../lib/mongodb";
const proposalsCollection = db.collection("proposals")
const projectsCollection = db.collection("projects")

export const ProposalResolvers: Resolvers = {
    Query: {
        Proposal:
            async (parent, args, context, info) => {
                // to add scrolling pagination 
                const proposals = await proposalsCollection.findOne({ _id: new ObjectId(args.id) })
                return proposals as unknown as Proposal;
            },
        ProposalsClient: async (parent, args, context, info) => {
            const proposal = await proposalsCollection.find({ client_id: new ObjectId(args.client_id) }).toArray();
            return proposal as unknown as Proposal[];
        },
        ProposalsFreelancer: async (parent, args, context, info) => {
            const proposal = await proposalsCollection.findOne({ freelancer_id: new ObjectId(args.freelancer_id) });
            return proposal as unknown as Proposal[];
        }
    },
    Mutation: {
        submitProposal: async (parent, args, context, info) => {
            // check if the project exits
            const project = await projectsCollection.findOne({ _id: new ObjectId(args.project_id) })

            if (!project) throw new Error("The project no longer exists")
            // the project with this id doesn't exist
            const proposal: Proposal = {
                ...args,
                created_at: new Date(),
                status: Proposal_Status.Approved,
                updated_at: new Date()
            }
            const insertedProposal = await proposalsCollection.insertOne(proposal);

            if (!insertedProposal.acknowledged) throw new Error("The project no longer exists");

            return proposal;
        },
        editProposal: async (parent, args, context, info) => {
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                { _id: new ObjectId(args.id) },
                {
                    $set: {
                        ...args
                    }
                }
                , {
                    returnDocument: "after"
                }
            )
            return updateProposal as unknown as Proposal;
        },
        declineProposal: async (parent, args, context, info) => {
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                { _id: new ObjectId(args.id) },
                {
                    $set: {
                        "status": Proposal_Status.Declined
                    }
                }
                , {
                    returnDocument: "after"
                }
            )
            return updateProposal as unknown as Proposal;

        },
        withdrawProposal: async (parent, args, context, info) => {
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                { _id: new ObjectId(args.id) },
                {
                    $set: {
                        "status": Proposal_Status.Canceled
                    }
                }
                , {
                    returnDocument: "after"
                }
            )
            return updateProposal as unknown as Proposal;

        },
        acceptProposal: async (parent, args, context, info) => {
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                { _id: new ObjectId(args.id) },
                {
                    $set: {
                        "status": Proposal_Status.Approved
                    }
                }
                , {
                    returnDocument: "after"
                }
            )
            return updateProposal as unknown as Proposal;

        }

    }
}