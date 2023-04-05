// import { Proposal, Resolvers } from '../../../types/resolvers';

import { Proposal, Resolvers } from "../types/resolvers";
import { ObjectId } from 'mongodb';



import db from "../lib/mongodb";
const proposalsCollection = db.collection("proposals")

export const ProposalResolvers: Resolvers = {
    Query: {
        Proposals:
            async (parent, args, context, info) => {
                // to add scrolling pagination 
                const proposals = await proposalsCollection.aggregate([{ $sample: { size: 20 } }]).toArray()
                return proposals as Proposal[];
            },
        Proposal: async (parent, args, context, info) => {
            const proposal = await proposalsCollection.findOne({ _id: new ObjectId(args.id) });
            return proposal as unknown as Proposal;
        }
    },
    // Mutation: {
    //     addProposal: async (parent, args, context, info) => {
    //         const proposal: Proposal = {
    //             ...args,
    //             reactions: {
    //                 love: 0,
    //                 dislike: 0,
    //             },
    //             created_date: new Date(),
    //         }
    //         const insertedProposal = await proposalsCollection.insertOne(proposal);
    //         return insertedProposal.acknowledged ? proposal : null;
    //     },
    //     editProposal: async (parent, args, context, info) => {
    //         const updateProposal = await proposalsCollection.findOneAndUpdate(
    //             { _id: new ObjectId(args.id) },
    //             {
    //                 $set: {
    //                     ...args
    //                 }
    //             }
    //             , {
    //                 returnDocument: "after"
    //             }
    //         )
    //         return updateProposal as unknown as Proposal;
    //     },
    //     deleteProposal: async (parent, args, context, info) => {
    //         // todo ;add a check if the user is the owner of the proposal
    //         const deleteProposal = await proposalsCollection.deleteOne({ _id: new ObjectId(args.id) })
    //         return {
    //             ackandlodement: deleteProposal.acknowledged && deleteProposal.deletedCount === 1,
    //             _id: args.id
    //         }
    //     }

    // }
}