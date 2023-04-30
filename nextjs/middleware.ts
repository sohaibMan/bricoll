import {withAuth} from "next-auth/middleware"
import {UserRole} from "./types/resolvers";


// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
    callbacks: {
        authorized({req, token}) {
            // `/admin` requires admin role
            if (req.nextUrl.pathname === "/admin") {
                return token?.userRole === UserRole.Admin;
            }
            // `/me` only requires the user to be logged in
            return !!token
        },
    },
})

export const config = {matcher: ["/admin", "/me"]}
