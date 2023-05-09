import db from "../../lib/mongodb";
import {
  Contract,
  Project,
  Proposal,
  Resolvers,
  Review,
  User,
} from "../../types/resolvers";
import { authenticatedMiddleware } from "./resolversHelpersFunctions/authenticatedMiddleware";
import { ObjectId } from "mongodb";
import { clientMiddleware } from "./resolversHelpersFunctions/clientMiddleware";
import { log } from "console";

const users = db.collection("users");
const proposals = db.collection("proposals");
const projects = db.collection("projects");
const contracts = db.collection("contracts");
export const ProfileResolvers: Resolvers = {
    Query: {
    Profile: async (parent, args, context, info) => {
      authenticatedMiddleware(context);


      return await users.findOne({
        _id: new ObjectId(context.user?.id),
      }) as unknown as User;
    },
  },
  User: {
    proposals: async (parent, args, context, info) => {
      return proposals
        .find({
          $or: [
            { client_id: new ObjectId(context.user?.id) },
            { freelancer_id: new ObjectId(context.user?.id) },
          ],
        })
        .limit(20) as unknown as [Proposal];
    },
    projects: async (parent, args, context, info) => {
      clientMiddleware(context);

      return projects
        .find({
          client_id: new ObjectId(context.user?.id),
        })
        .limit(20) as unknown as [Project]; // Todo: fixing the pagination limit
    },
    contracts: async (parent, args, context, info) => {
      return contracts
        .find({
          $or: [
            { client_id: new ObjectId(context.user?.id) },
            { freelancer_id: new ObjectId(context.user?.id) },
          ],
        })
        .limit(20) as unknown as [Contract];
    },
  },

  Mutation: {
    addReview: async(parent, args, context, info) => {


      // const user = users.findOne({_id: })
      // client_id = (context.user?.userRole === "Client") ? context.user?.
    
      authenticatedMiddleware(context);

      const review: Review = {
        _id: new ObjectId(),
        reviewer_id: new ObjectId(context.user?.id),
        description: args.description,
        rating: args.rating,
        createdAt: Date.now()
      }

       await users.updateOne({_id: new ObjectId(args.user_id)}, {$push: {
        reviews: review
      }})
      return {
        acknowledgement: true,
        _id: review._id
    }


      
    },
    editReview: async(parent, args, context, info) => {
      authenticatedMiddleware(context);

      const review: Review = {
        _id: new ObjectId(args.id),
        reviewer_id: new ObjectId(context.user?.id),
        description: args.description,
        rating: args.rating,
        createdAt: Date.now()
      }

       await users.updateOne({_id: new ObjectId(context.user?.id), "reviews._id": new ObjectId(args.id)}, {$set: {
       "reviews.$.description": args.description,
       "reviews.$.rating": args.rating,
      }})


      return {
        acknowledgement: true,
        _id: args.id
    }
    },
    removeReview: async(parent, args, context, info) => {

      authenticatedMiddleware(context);
      
       await users.updateOne({_id: new ObjectId(context.user?.id)}, {
        $unset:{
          "reviews._id": new ObjectId(args.id)
        }
      })
      return {
        acknowledgement: true,
        _id: args.id
    }
    }
    
  }

};
