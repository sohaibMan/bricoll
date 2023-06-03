import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import db, { clientPromise } from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { UserRole } from "../../../types/resolvers";
import { redis } from "../../../lib/redis";


async function verifyUserData(
  user: any,
  credentialPassword: string
): Promise<User> {
  if (!user || !user.hashedPassword) {
    throw new Error("Invalid credentials");
  }

  const isCorrectPassword = await bcrypt.compare(
    credentialPassword,
    user.hashedPassword
  );

  if (!isCorrectPassword) {
    throw new Error("Invalid credentials");
  }



  return {
    id: user._id.toString(),
    userRole: user.userRole as UserRole,
    email: user.email,
    username: user.username,
    jobTitle: user.jobTitle,
    image: user.image,
    isCompleted: user.isCompleted as boolean,
    accessToken: user.accessToken,
  };
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        let user;

        // return users
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          const cacheResults = await redis.get(credentials.email);
          if (cacheResults) {
            user = JSON.parse(cacheResults);

            return await verifyUserData(user, credentials.password);
          }

          user = await db
            .collection("users")
            .findOne({ email: credentials.email });

          await redis.set(credentials.email, JSON.stringify(user));

          return await verifyUserData(user, credentials.password);
        } catch (err: any) {
          throw new Error(err);
          //
        }
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
 callbacks: {
        async jwt({token, user,  trigger}) {

            if (trigger === "update" && token && token.email) {
                const cacheResults = await redis.get(token.email);
                if (cacheResults && JSON.parse(cacheResults)) {

                    token.isCompleted = JSON.parse(cacheResults).isCompleted;
                    token.userRole = JSON.parse(cacheResults).userRole
                } else {

                    const user = await db
                        .collection("users")
                        .findOne({email: token.email});

                    await redis.set(token.email, JSON.stringify(user));
                    token.isCompleted = user?.isCompleted;
                    token.userRole = user?.userRole;
                }
            }

            if (user?.userRole) token.userRole = user.userRole;
            // console.log(users?.isCompleted)
            if (user?.isCompleted !== undefined) token.isCompleted = user?.isCompleted;



      return token;
    },
    async session({ session, token }) {
      if (!session.user || !token) return session;

      const userData = await db.collection("users").findOne({
        email: session.user.email,
      });



      if(token.sub) session.user.id = token.sub;
      session.user.accessToken = token.accessToken;
      session.user.userRole = token.userRole;
      session.user.isCompleted = token.isCompleted;


      session.user.username = userData?.username;
      session.user.jobTitle = userData?.jobTitle;
      session.user.image = userData?.image;

    //   console.log("session , ", session);

      return session;
    },
  },
  events: {
    // signIn: ({isNewUser, user, account, profile}) => {
    //     console.log("signIn", isNewUser, user, account, profile);
    // },
  },
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    newUser: "/register",
    signOut: "/",
  },
};

export default NextAuth(authOptions);
