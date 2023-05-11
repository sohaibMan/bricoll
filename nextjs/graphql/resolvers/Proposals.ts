import {ObjectId} from 'mongodb';
import {Project, Proposal, Proposal_Status, Resolvers} from "../../types/resolvers";
import db from "../../lib/mongodb";
import {GraphQLError} from 'graphql';
import {freelancerMiddleware} from './resolversHelpersFunctions/freelancerMiddleware';
import {clientMiddleware} from './resolversHelpersFunctions/clientMiddleware';
import {
    OnAcceptProposal,
    OnCancelProposal,
    OnCreateProposal,
    OnEditProposal,
    OnProposalDeclined
} from "../../email/notifyEmail";
import {authenticatedMiddleware} from "./resolversHelpersFunctions/authenticatedMiddleware";

const proposalsCollection = db.collection("proposals")
const projectsCollection = db.collection("projects")

export const ProposalResolvers: Resolvers = {
    Query: {
        Proposal:
            async (parent, args, context, info) => {
                //? the client have access related to him project
                //? the freelance have access only to his proposals...
                // to create scrolling pagination
                // index scan on id
                authenticatedMiddleware(context);// throws a graphql error if the user is not authenticated
                const proposals = await proposalsCollection.findOne({$and: [{_id: new ObjectId(args.id)}, {$or: [{client_id: new ObjectId(context.user?.id)}, {freelancer_id: new ObjectId(context.user?.id)}]}]}) as unknown as Proposal | null;
                if (!proposals) throw new GraphQLError("The proposals no longer exists",
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
            // check if the freelancer already submit a proposals
            // the freelancer can submit one and only one proposals for each project if the status is InProgress or Approved or Declined which mean unless the proposals is canceled by the freelancer him self
            // index scan on project_id
            const submitProposal = await proposalsCollection.findOne({
                project_id: new ObjectId(args.project_id),
                freelancer_id: new ObjectId(context.user?.id),
                status: {$nin: [Proposal_Status.Canceled]}
            })
            // const submitProposal = await projectsCollection.findOne({ freelancer_id: context.user.id, project_id: args.project_id, status: { $nin: [Proposal_Status.Canceled] } })
            if (submitProposal) throw new GraphQLError("You already submit a proposals for this project",

                {
                    extensions: {
                        code: 'ALREADYEXISTS',
                        http: {status: 400},
                    },
                });
            // the freelancer already submit a proposals for this project
            const proposal: Proposal = {
                _id: new ObjectId(),
                cover_letter: args.cover_letter,
                description: args.description,
                price: args.price,
                duration: args.duration,
                freelancer_id: new ObjectId(context.user?.id),
                client_id: project.client_id,
                project_id: new ObjectId(args.project_id),
                created_at: new Date(),
                status: Proposal_Status.InProgress,
                updated_at: new Date(),
                attachments: args.attachments || []
            }
            const insertedProposal = await proposalsCollection.insertOne(proposal);

            if (!insertedProposal.acknowledged) throw new Error("The project no longer exists");
            // do await to send the email(fire and forget)
            OnCreateProposal(project.client_id);
            return proposal;
        },
        editProposal: async (parent, args, context, info) => {

            // only the freelancer can edit his proposals
            freelancerMiddleware(context);//=> check if the user is authenticated as freelancer (->stop the execution with an error if not authenticated as freelancer)
            // the context is not null here
            let updatedFields = Object.assign({}, args);
            delete updatedFields.id;// it will contain all the updated fields without the id

            //     because the args contain the id of the project ,and we don't want to update it
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                // index on id
                {
                    _id: new ObjectId(args.id),
                    freelancer_id: new ObjectId(context.user?.id),
                    status: Proposal_Status.InProgress
                },
                {
                    $set: updatedFields
                }
                , {
                    returnDocument: "after"
                }
            )
            // console.log(updateProposal)
            // check if the proposals exits
            if (!updateProposal.value) throw new Error("The proposals no longer exists");
            //return the value (the updated proposals)
            const proposal = updateProposal.value as unknown as Proposal;
            OnEditProposal(proposal.client_id);
            return proposal;
        },
        declineProposal: async (parent, args, context, info) => {
            // only the client can decline a proposals
            clientMiddleware(context);
            // the client can decline just the proposals related to his project
            const project = await projectsCollection.findOne({
                client_id: new ObjectId(context.user?.id),
                "status": Proposal_Status.InProgress
            })
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
            // check if the proposals exits
            if (updateProposal.lastErrorObject?.updatedExisting === false) throw new Error("The proposals no longer exists");
            //return the value (the updated proposals)
            const proposal = updateProposal.value as unknown as Proposal;
            OnProposalDeclined(proposal.freelancer_id);
            return proposal;

        },
        cancelProposal: async (parent, args, context, info) => {
            // only the freelancer can withdraw his proposals
            freelancerMiddleware(context);
            // the freelancer can withdraw just his proposals
            // index scan on id
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                {
                    _id: new ObjectId(args.id),
                    freelancer_id: new ObjectId(context.user?.id),
                    status: Proposal_Status.InProgress
                },
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
            // check if the proposals exits
            if (updateProposal.lastErrorObject?.updatedExisting === false) throw new GraphQLError("The proposals no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                    }
                });
            //return the value (the updated proposals)
            const proposal = updateProposal.value as unknown as Proposal;
            OnCancelProposal(proposal.client_id);
            return proposal;

        },
        acceptProposal: async (parent, args, context, info) => {
            // only the client can accept a proposals
            clientMiddleware(context);
            // the client can accept just the proposals related to his project
            const project = await projectsCollection.findOne({client_id: new ObjectId(context.user?.id)})
            if (!project) throw new GraphQLError("The project no longer exists",
                {
                    extensions: {
                        code: 'NOTFOUND',
                        http: {status: 404},
                    },
                });
            // index scan on id
            const updateProposal = await proposalsCollection.findOneAndUpdate(
                {_id: new ObjectId(args.id), "status": Proposal_Status.InProgress},
                {
                    $set: {
                        "status": Proposal_Status.Approved
                    }
                }
                , {
                    returnDocument: "after"
                }
            )
            // check if the proposals exits
            if (!updateProposal.value) throw new Error("The proposals no longer exists");
            //return the value (the updated proposals)
            const proposal = updateProposal.value as unknown as Proposal;
            OnAcceptProposal(proposal.freelancer_id);
            return proposal;
        }


    }
}