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
        ProposalsByFreelancer: async (parent, args, context, info) => {
            const proposal = await proposalsCollection.findOne({ freelancer_id: new ObjectId(args.freelancer_id) });
            return proposal as unknown as Proposal[];
        },
        ProposalsByProject: async (parent, args, context, info) => {
            const proposals = await proposalsCollection.find({ project_id: new ObjectId(args.project_id) }).toArray();
            return proposals as unknown as Proposal[];
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
                project_id: new ObjectId(args.project_id),
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
            // check if the proposal exits
            if (updateProposal.lastErrorObject?.updatedExisting === false) throw new Error("The proposal no longer exists");
            //return the value (the updated proposal)
            return updateProposal.value as unknown as Proposal;
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
            // check if the proposal exits
            if (updateProposal.lastErrorObject?.updatedExisting === false) throw new Error("The proposal no longer exists");
            //return the value (the updated proposal)
            return updateProposal.value as unknown as Proposal;

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
            // check if the proposal exits
            if (updateProposal.lastErrorObject?.updatedExisting === false) throw new Error("The proposal no longer exists");
            //return the value (the updated proposal)
            return updateProposal.value as unknown as Proposal;

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
            // check if the proposal exits
            if (updateProposal.lastErrorObject?.updatedExisting === false) throw new Error("The proposal no longer exists");
            //return the value (the updated proposal)
            return updateProposal.value as unknown as Proposal;

        }

    }
}