import "next-auth/jwt"
import User, { DefaultSession, DefaultUser } from "next-auth"
import { UserRole } from "./resolvers"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation


declare module "next-auth" {


  interface JWT {
    /** The user's role. */
    userRole?: UserRole
  }
  interface User extends DefaultUser {
    hashedPassword: string
    userRole: UserRole
  }
  interface Session {
    user: {
      id: string
      userRole: UserRole
    } & DefaultSession["user"]
  }
}

