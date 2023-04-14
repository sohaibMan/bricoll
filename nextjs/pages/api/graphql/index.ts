import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import path from "node:path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { ProjectResolvers } from "../../../resolvers/Projects";
import { ProposalResolvers } from "../../../resolvers/Proposals";
import { getToken } from "next-auth/jwt";
import { ServerContext } from "../../../types/server-context";
import { constraintDirective, constraintDirectiveTypeDefs } from "graphql-constraint-directive";

// path to this folders
const rootPath = path.join(__dirname, "../../../../", "pages/api/graphql");
//path to schema from this folder
const schemaPath = path.join(rootPath, "/schema/*.graphql");

// load schema
let schema = loadSchemaSync(schemaPath, {
  loaders: [new GraphQLFileLoader()],
});

schema = constraintDirective()(schema)
// tmp (hardcoded)

// create apollo server instance
const server = new ApolloServer<ServerContext>({
  typeDefs: [constraintDirectiveTypeDefs, schema],
  resolvers: [ProjectResolvers, ProposalResolvers],
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const secret = process.env.NEXTAUTH_SECRET;

    // 
    const token = await getToken({ req, secret });

    // the users that sign with a provider (google or facebook ) will have a session with this info
    // const token = await getToken({ req });
    // console.log("🚀 ~ file: index.ts:42 ~ context: ~ token:", token)
    if (!token || !token.sub) return { user: null }
    return { user: { id: token.sub, userRole: token.userRole } }
    // }
    // console.log("🚀 ~ file: index.ts:42 ~ context: ~ token:", token)
    // const session = await getServerSession(req, res, authOptions);
    // console.log("🚀 ~ file: index.ts:42 ~ context: ~ session:", session)
    // if (!session) return { user: null }
    // return { user: { id: session.user.id, userRole: session.user.userRole } };

  },
});
