// import { Proposal, Resolvers } from '../../../types/resolvers';

import { ObjectId } from 'mongodb';
import { Proposal, Proposal_Status, Resolvers } from "../types/resolvers";
import db from "../lib/mongodb";
import { GraphQLError } from 'graphql';
import { freelancerMiddleware } from './resolversHelpersFunctions/freelancerMiddleware';
import { clientMiddleware } from './resolversHelpersFunctions/clientMiddleware';
const proposalsCollection = db.collection("proposals")
const projectsCollection = db.collection("projects")

export const ProposalResolvers: Resolvers = {
    Query: {
        Proposal:
            async (parent, args, context, info) => {
                //? the client have access related to him project
                //? the freelance have access only to his proposal...
                // to add scrolling pagination 
                const proposals = await proposalsCollection.findOne({ _id: new ObjectId(args.id) })
                return proposals as unknown as Proposal;
            },
        // ProposalsByFreelancer: async (parent, args, context, info) => {
        //     const proposal = await proposalsCollection.findOne({ freelancer_id: new ObjectId(args.freelancer_id) });
        //     return proposal as unknown as Proposal[];
        // },
        // ProposalsByProject: async (parent, args, context, info) => {
        //     const proposals = await proposalsCollection.find({ project_id: new ObjectId(args.project_id) }).toArray();
        //     return proposals as unknown as Proposal[];
        // }

    },
    Mutation: {
        submitProposal: async (parent, args, context, info) => {
            // check if the project exits
            freelancerMiddleware(context);

            const project = await projectsCollection.findOne({ _id: new ObjectId(args.project_id) })

            if (!project) throw new GraphQLError("The project no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: { status: 404 },
                    },
                });
            // the project with this id doesn't exist
            // check if the freelancer already submit a proposal 
            // @ts-ignore
            // the freelancer can submit one and only one proposal for each project if the status is InProgress or Approved or Declined which mean unless the proposal is canceled by the freelancer him self
            // const submitProposal = await projectsCollection.findOne({ freelancer_id: context.user.id, project_id: args.project_id, status: { $in: [Proposal_Status.InProgress, Proposal_Status.Approved, Proposal_Status.Declined] } })
            const submitProposal = await proposalsCollection.findOne({ freelancer_id: new ObjectId(context.user.id), project_id: new ObjectId(args.project_id), status: { $nin: [Proposal_Status.Canceled] } })
            // const submitProposal = await projectsCollection.findOne({ freelancer_id: context.user.id, project_id: args.project_id, status: { $nin: [Proposal_Status.Canceled] } })
            if (submitProposal) throw new GraphQLError("You already submit a proposal for this project",

                {
                    extensions: {
                        code: 'ALREADYEXISTS',
                        http: { status: 400 },
                    },
                });
            // the freelancer already submit a proposal for this project
            const proposal: Proposal = {
                _id: new ObjectId(),
                cover_letter: args.cover_letter,
                description: args.description,
                price: args.price,
                duration: args.duration,
                // @ts-ignore
                freelancer_id: new ObjectId(context.user.id),
                project_id: new ObjectId(args.project_id),
                created_at: new Date(),
                status: Proposal_Status.InProgress,
                updated_at: new Date()
            }
            const insertedProposal = await proposalsCollection.insertOne(proposal);

            if (!insertedProposal.acknowledged) throw new Error("The project no longer exists");

            return proposal;
        },
        editProposal: async (parent, args, context, info) => {
            // only the freelancer can edit his proposal
            freelancerMiddleware(context);//=> check if the user is authenticated as freelancer (->stop the execution with an error if not authenticated as freelancer)
            // the context is not null here
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                // @ts-ignore
                { _id: new ObjectId(args.id), freelancer_id: new ObjectId(context.user.id) },
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
            // only the client can decline a proposal
            clientMiddleware(context);
            // the client can decline just the proposal related to his project
            // @ts-ignore
            const project = await projectsCollection.findOne({ client_id: new ObjectId(context.user.id) })
            if (!project) throw new GraphQLError("The project no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: { status: 404 },
                    },
                });

            const updateProposal = await proposalsCollection.findOneAndUpdate(
                { _id: new ObjectId(args.id), project_id: new ObjectId(project._id) },
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
            // only the freelancer can withdraw his proposal
            freelancerMiddleware(context);
            // the freelancer can withdraw just his proposal
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                // @ts-ignore
                { _id: new ObjectId(args.id), freelancer_id: new ObjectId(context.user.id) },
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
            // only the client can accept a proposal
            clientMiddleware(context);
            // the client can accept just the proposal related to his project
            // @ts-ignore
            const project = await projectsCollection.findOne({ client_id: new ObjectId(context.user.id) })
            if (!project) throw new GraphQLError("The project no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: { status: 404 },
                    },
                });

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