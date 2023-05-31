import { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "./resolvers";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface jwt {
    sub: string;
    userRole: UserRole;
    isCompleted: boolean;
    accessToken: string;
    username: string;
    jobTitle: string;
    image: string;
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    userRole: UserRole;
    isCompleted: boolean;
    accessToken: string;
    username: string;
    jobTitle: string;
    image: string;
  }

  interface Session {
    user: {
      id: string;
      userRole: UserRole;
      isCompleted: boolean;
      accessToken: string;
      username: string;
      jobTitle: string;
      image: string;
    } & DefaultSession["user"];
  }
}
