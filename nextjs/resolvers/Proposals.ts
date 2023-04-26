import {ObjectId} from 'mongodb';
import {Project, Proposal, Proposal_Status, Resolvers} from "../types/resolvers";
import db from "../lib/mongodb";
import {GraphQLError} from 'graphql';
import {freelancerMiddleware} from './resolversHelpersFunctions/freelancerMiddleware';
import {clientMiddleware} from './resolversHelpersFunctions/clientMiddleware';
import {
    OnNewProposal, OnProposalAccepted,
    OnProposalChange,
    OnProposalDeclined,
    OnProposalWithDrawn
} from "./resolversHelpersFunctions/notifyEmail";

const proposalsCollection = db.collection("proposals")
const projectsCollection = db.collection("projects")

export const ProposalResolvers: Resolvers = {
    Query: {
        Proposal:
            async (parent, args, context, info) => {
                //? the client have access related to him project
                //? the freelance have access only to his proposal...
                // to add scrolling pagination
                // index scan on id
                if (!context.user) throw new GraphQLError("You are not authenticated",
                    {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                            http: {status: 401},
                        },
                    }
                )
                const proposals = await proposalsCollection.findOne({$and: [{_id: new ObjectId(args.id)}, {$or: [{client_id: new ObjectId(context.user.id)}, {freelancer_id: new ObjectId(context.user.id)}]}]}) as unknown as Proposal | null;
                if (!proposals) throw new GraphQLError("The proposal no longer exists",
                    {
                        extensions: {
                            code: 'NOTFOUND',
                            http: {status: 404},
                        }
                    }
                )
                return proposals;
            },

    },
    Mutation: {
        createProposal: async (parent, args, context, info) => {
            // check if the project exits
            freelancerMiddleware(context);


            const project = await projectsCollection.findOne({_id: new ObjectId(args.project_id)}) as unknown as Project;

            if (!project) throw new GraphQLError("The project no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: {status: 404},
                    },
                });
            // the project with this id doesn't exist
            // check if the freelancer already submit a proposal 
            // @ts-ignore
            // the freelancer can submit one and only one proposal for each project if the status is InProgress or Approved or Declined which mean unless the proposal is canceled by the freelancer him self
            // index scan on project_id
            const submitProposal = await proposalsCollection.findOne({
                project_id: new ObjectId(args.project_id),
                // @ts-ignore
                freelancer_id: new ObjectId(context.user.id),
                status: {$nin: [Proposal_Status.Canceled]}
            })
            // const submitProposal = await projectsCollection.findOne({ freelancer_id: context.user.id, project_id: args.project_id, status: { $nin: [Proposal_Status.Canceled] } })
            if (submitProposal) throw new GraphQLError("You already submit a proposal for this project",

                {
                    extensions: {
                        code: 'ALREADYEXISTS',
                        http: {status: 400},
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
                client_id: project.client_id,
                project_id: new ObjectId(args.project_id),
                created_at: new Date(),
                status: Proposal_Status.InProgress,
                updated_at: new Date()
            }
            const insertedProposal = await proposalsCollection.insertOne(proposal);

            if (!insertedProposal.acknowledged) throw new Error("The project no longer exists");
            // do await to send the email(fire and forget)
            OnNewProposal(project.client_id);
            return proposal;
        },
        editProposal: async (parent, args, context, info) => {

            // only the freelancer can edit his proposal
            freelancerMiddleware(context);//=> check if the user is authenticated as freelancer (->stop the execution with an error if not authenticated as freelancer)
            // the context is not null here
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                // @ts-ignore
                // index on id
                {_id: new ObjectId(args.id), freelancer_id: new ObjectId(context.user.id)},
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
            const proposal = updateProposal.value as unknown as Proposal;
            OnProposalChange(proposal.client_id);
            return proposal;
        },
        declineProposal: async (parent, args, context, info) => {
            // only the client can decline a proposal
            clientMiddleware(context);
            // the client can decline just the proposal related to his project
            // @ts-ignore
            const project = await projectsCollection.findOne({client_id: new ObjectId(context.user.id)})
            if (!project) throw new GraphQLError("The project no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: {status: 404},
                    },
                });

            // index scan on id
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                {_id: new ObjectId(args.id), project_id: new ObjectId(project._id), status: Proposal_Status.InProgress},
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
            const proposal = updateProposal.value as unknown as Proposal;
            OnProposalDeclined(proposal.freelancer_id);
            return proposal;

        },
        withdrawProposal: async (parent, args, context, info) => {
            // only the freelancer can withdraw his proposal
            freelancerMiddleware(context);
            // the freelancer can withdraw just his proposal
            // index scan on id
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                // @ts-ignore
                {_id: new ObjectId(args.id), freelancer_id: new ObjectId(context.user.id)},
                {
                    $set: {
                        "status": Proposal_Status.Canceled
                    }
                }
                , {
                    returnDocument: "after"
                }
            )
            // console.log(updateProposal)
            // check if the proposal exits
            if (updateProposal.lastErrorObject?.updatedExisting === false) throw new GraphQLError("The proposal no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                    }
                });
            //return the value (the updated proposal)
            const proposal = updateProposal.value as unknown as Proposal;
            OnProposalWithDrawn(proposal.client_id);
            return proposal;

        },
        acceptProposal: async (parent, args, context, info) => {
            // only the client can accept a proposal
            clientMiddleware(context);
            // the client can accept just the proposal related to his project
            // @ts-ignore
            const project = await projectsCollection.findOne({client_id: new ObjectId(context.user.id)})
            if (!project) throw new GraphQLError("The project no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: {status: 404},
                    },
                });
            // index scan on id
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                {_id: new ObjectId(args.id)},
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
            const proposal = updateProposal.value as unknown as Proposal;
            OnProposalAccepted(proposal.freelancer_id);
            return proposal;

        }

    }
}