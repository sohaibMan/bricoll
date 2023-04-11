import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import path from "node:path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { ProjectResolvers } from "../../../resolvers/Projects";
import { ProposalResolvers } from "../../../resolvers/Proposals";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ServerContext } from "../../../types/server-context";
import { UserRole } from "../../../types/resolvers";

// path to this folders
const rootPath = path.join(__dirname, "../../../../", "pages/api/graphql");
//path to schema from this folder
const schemaPath = path.join(rootPath, "/schema/*.graphql");

// load schema
const schema = loadSchemaSync(schemaPath, {
  loaders: [new GraphQLFileLoader()],
});

// tmp (hardcoded)

// create apollo server instance
const server = new ApolloServer<ServerContext>({
  typeDefs: schema,
  resolvers: [ProjectResolvers, ProposalResolvers],
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const secret = process.env.NEXTAUTH_SECRET;

    // 
    const token = await getToken({ req, secret });

    // the users that sign with a provider (google or facebook ) will have a session with this info
    const session = await getServerSession(req, res, authOptions);

    if (!session || !token) return { user: null };
    console.log("session ", session);
    console.log("token ", token);


    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.startsWith("Bearer")
    // ) {
    //   token = req.headers.authorization.split(" ")[1];
    // }
    

    return { user: { id: session?.user.id, userRole: session?.user.userRole } || {id: token.id, email: token.email} };
  },
});
