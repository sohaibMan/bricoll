import {ApolloServer} from "@apollo/server";
import {startServerAndCreateNextHandler} from "@as-integrations/next";
import path from "node:path";
import {loadSchemaSync} from "@graphql-tools/load";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {ProjectResolvers} from "../../../graphql/resolvers/Projects";
import {ProposalResolvers} from "../../../graphql/resolvers/Proposals";
import {getToken} from "next-auth/jwt";
import {ServerContext} from "../../../types/server-context";
import {constraintDirectiveTypeDefs} from "graphql-constraint-directive";
import {ContractResolvers} from "../../../graphql/resolvers/Contract";
import {UserRole} from "../../../types/resolvers";
import {createApollo4QueryValidationPlugin} from "graphql-constraint-directive/apollo4";
import depthLimit from 'graphql-depth-limit'
import {GraphQLError} from "graphql";
import { ProfileResolvers } from "../../../graphql/resolvers/Profile";

// path to those folders
const rootPath = path.join(__dirname, "../../../../");
//path to schema from this folder
const schemaPath = path.join(rootPath, "graphql/schema/*.graphql");

// load schema
let schema = loadSchemaSync(schemaPath, {
    loaders: [new GraphQLFileLoader()],
});


const plugins = [
    createApollo4QueryValidationPlugin({
        schema
    })
]


// create apollo server instance
const server = new ApolloServer<ServerContext>({
    typeDefs: [constraintDirectiveTypeDefs, schema],
    resolvers: [ProjectResolvers, ProposalResolvers, ContractResolvers,ProfileResolvers],
    plugins,
    validationRules: [depthLimit(4)]
});

export default startServerAndCreateNextHandler(server,
    {
        context: async (req, res) => {
            //
            const token = await getToken({req});

            console.log("token is", token)

            // the users that sign with a provider (google or facebook ) will have a session with this info
            if (!token || !token.sub) return {user: null}

            // console.log(token.userRole)
            if (token && token.isCompleted === false) {
                throw new GraphQLError("Please complete your profile",
                    {
                        extensions: {
                            code: "BAD_REQUEST",
                            http: {status: 400}

                        }
                    })
            }

            //
            return {
                user: {
                    id: token.sub.toString(),
                    userRole: token.userRole as UserRole,
                    accessToken: token.accessToken
                }
            }


        },
    });

//todo :Move the graphql/resolvers and the graphql/resolvers to the nextjs folder so they won't be exposed