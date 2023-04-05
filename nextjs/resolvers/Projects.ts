import { Project, Resolvers } from "../types/resolvers.d";
import { ObjectId } from 'mongodb';



import db from "../lib/mongodb";
const projectsCollection = db.collection("projects")

export const ProjectResolvers: Resolvers = {
    Query: {
        Projects:
            async (parent, args, context, info) => {
                // to add scrolling pagination 
                const projects = await projectsCollection.aggregate([{ $sample: { size: 20 } }]).toArray()
                return projects as Project[];
            },
        Project: async (parent, args, context, info) => {
            const project = await projectsCollection.findOne({ _id: new ObjectId(args.id) });
            if (!project) throw new Error("There is no project with this Id");
            return project as Project;
        }
    },
    Mutation: {
        addProject: async (parent, args, context, info) => {
            const project: Project = {
                ...args,
                reactions: {
                    love: 0,
                    dislike: 0,
                },
                created_at: new Date(),
            }
            const insertedProject = await projectsCollection.insertOne(project);
            return insertedProject.acknowledged ? project : null;
        },
        editProject: async (parent, args, context, info) => {
            const updateProject = await projectsCollection.findOneAndUpdate(
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
            return updateProject as unknown as Project;
        },
        deleteProject: async (parent, args, context, info) => {
            // todo ;add a check if the user is the owner of the project
            const deleteProject = await projectsCollection.deleteOne({ _id: new ObjectId(args.id) })
            return {
                ackandlodement: deleteProject.acknowledged && deleteProject.deletedCount === 1,
                _id: args.id
            }
        }

    }
}