import {DefaultSession, DefaultUser} from "next-auth"
import {UserRole} from "./resolvers"
import {ObjectId} from "mongodb";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        sub: ObjectId
        userRole: UserRole
        isCompleted: boolean
        accessToken: string
    }
}


declare module "next-auth" {
    interface User extends DefaultUser {
        id: ObjectId
        userRole: UserRole
        isCompleted: boolean
        accessToken: string
    }

    interface Session {
        user: {
            id: ObjectId
            userRole: UserRole
            isCompleted: boolean
            accessToken: string
        } & DefaultSession["user"]
    }
}

