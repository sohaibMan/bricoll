import { DefaultSession, DefaultUser } from "next-auth"
import { UserRole } from "./resolvers"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    userRole: UserRole
    isCompleted:boolean
  }
}




declare module "next-auth" {
  interface User extends DefaultUser {

    userRole: UserRole
    isCompleted:boolean
    // accesToken: any
  }
  interface Session {
    user: {
      id: number
      userRole: UserRole
      accessToken: any
    } & DefaultSession["user"]
  }
}

