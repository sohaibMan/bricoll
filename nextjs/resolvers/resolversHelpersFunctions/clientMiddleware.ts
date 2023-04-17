import { UserRole } from "../../types/resolvers";
import { GraphQLError } from "graphql";
import { ServerContext } from "../../types/server-context";

export const clientMiddleware = (context: ServerContext) => {
    // this middleware is used to check if the user is authenticated as client
    if (!context.user)
        throw new GraphQLError("You are unauthorized",
            {
                extensions: {
                    code: 'unauthorized',
                    http: { status: 401 },
                },
            });
    // if the user is not a client
    if (context.user.userRole !== UserRole.Client)
        throw new GraphQLError("You are not authenticated as client",
            {
                extensions: {
                    code: 'Bad Request',
                    http: { status: 400 },
                },
            }
        );


};
