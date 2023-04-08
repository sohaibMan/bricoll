import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import path from "node:path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { ProjectResolvers } from "../../../resolvers/Projects";
import { ProposalResolvers } from "../../../resolvers/Proposals";

// path to this folders
const rootPath = path.join(__dirname, "../../../../", "pages/api/graphql");
//path to schema from this folder
const schemaPath = path.join(rootPath, "/schema/*.graphql");

// load schema
const schema = loadSchemaSync(schemaPath, {
  loaders: [new GraphQLFileLoader()],
});

// create apollo server instance
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: [ProjectResolvers, ProposalResolvers],
});

export default startServerAndCreateNextHandler(server);
