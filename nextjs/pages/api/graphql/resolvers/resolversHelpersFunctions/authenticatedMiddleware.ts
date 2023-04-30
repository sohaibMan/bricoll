import {GraphQLError} from "graphql";
import {ServerContext} from "../../../../../types/server-context";

export const authenticatedMiddleware = (context: ServerContext) => {
    // this middleware is used to check if the user is authenticated as client
    if (!context.user)
        throw new GraphQLError("You are unauthorized",
            {
                extensions: {
                    code: 'unauthorized',
                    http: {status: 401},
                },
            });


};
