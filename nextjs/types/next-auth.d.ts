import "next-auth/jwt"
import User, { DefaultUser } from "next-auth"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: "admin" | "client" | "freelancer"
  }
  interface User extends DefaultUser {
    hashedPassword: string
  }
}
