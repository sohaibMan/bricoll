import { UserRole } from "../../../types/resolvers";
import { GraphQLError } from "graphql";
import { ServerContext } from "../../../types/server-context";
import { useRouter } from "next/router";

export const checkingUserMiddleware = (context: ServerContext) => {
  // const router = useRouter();

  // this middleware is used to check if the users is authenticated as freelancer
  if (!context.user?.isCompleted) {
    throw new GraphQLError(
      "You are unauthorized, Try to complete your profile information!",
      {
        extensions: {
          code: "unauthorized",
          http: { status: 401 },
        },
      }
    );
  }
};

