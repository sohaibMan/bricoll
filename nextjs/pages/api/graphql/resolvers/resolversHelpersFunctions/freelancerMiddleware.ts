import { UserRole } from "../../../../../types/resolvers";
import { GraphQLError } from 'graphql';
import { ServerContext } from '../../../../../types/server-context';

export const freelancerMiddleware = (context: ServerContext) => {
    // this middleware is used to check if the user is authenticated as freelancer
    if (!context.user)
        throw new GraphQLError("You are unauthorized",
            {
                extensions: {
                    code: 'unauthorized',
                    http: { status: 401 },
                },
            });
    // if the user is not a client
    if (context.user.userRole !== UserRole.Freelancer)
        throw new GraphQLError("You are not authenticated as freelancer",
            {
                extensions: {
                    code: 'Bad Request',
                    http: { status: 400 },
                },
            }
        );

};
