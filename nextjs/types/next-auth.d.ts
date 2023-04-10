import "next-auth/jwt"
import User, { DefaultSession, DefaultUser } from "next-auth"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation


declare module "next-auth" {


  interface JWT {
    /** The user's role. */
    userRole?: "client" | "freelancer"
  }
  interface User extends DefaultUser {
    hashedPassword: string
  }
  interface Session {
    user: {
      id: string
      userRole: "client" | "freelancer"
    } & DefaultSession["user"]
  }
}

