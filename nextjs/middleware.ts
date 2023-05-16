import {withAuth} from "next-auth/middleware";
import {UserRole} from "./types/resolvers";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
    callbacks: {
        authorized({req, token}) {

            if (req.nextUrl.pathname === "/projects") {
                return token?.userRole === UserRole.Freelancer;
            }
            if (req.nextUrl.pathname === "/dashboard") {
                return token?.userRole === UserRole.Client || token?.userRole === UserRole.Freelancer;
            }
            // if (req.nextUrl.pathname === "/freelancers") {
            //     return token?.userRole === UserRole.Client;
            // }
            return !!token;
        },
    },
});

export const config = {
    matcher: ["/projects", "/dashboard", "/freelancers"],
};
