import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import db from "../../../lib/mongodb";
import bcrypt from 'bcrypt';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { UserRole } from "../../../types/resolvers";
import { clientPromise } from "../../../lib/mongodb";
import { redis } from "../../../lib/redis.ts"
// import { User } from "next-auth/jwt";
// import { User } from "next-auth/jwt";
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

async function verifyUserData(user: any, credentialPassword: string){
  if (!user || !user.hashedPassword) {
    throw new Error('Invalid credentials');
  }

  const isCorrectPassword = await bcrypt.compare(
    credentialPassword,
    user.hashedPassword
  );

  if (!isCorrectPassword) {
    throw new Error('Invalid credentials');
  }

  // console.log("queried data from Redis ...");

  return { id: user._id.toString(), userRole: user.userRole as UserRole, email: user.email, name: user.name,isCompleted:user.isCompleted as boolean };
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
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {

        // const authResponse = await fetch("/users/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(credentials),
        // })

        // if (!authResponse.ok) {
        //   return null
        // }

        // const user = await authResponse.json()

        let user;

        // return user
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        try {
          const cacheResults = await redis.get(credentials.email);
          if(cacheResults){
            user = JSON.parse(cacheResults);

            console.log("queried data from Redis Database ...")

            return verifyUserData(user, credentials.password);
          }

          user = await db.collection("users").findOne({ email: credentials.email });

          console.log("queried data from MongoDB ...")

          // Caching the data via Redis
          await redis.set(credentials.email, JSON.stringify(user))

          return verifyUserData(user, credentials.password);

        } catch( err ){
          throw new Error(err);
        }

        // user = await db.collection("users").findOne({ email: credentials.email });
        // console.log("🚀 ~ file: [...nextauth].ts:57 ~ authorize ~ user:", user)

        
        // return { id: "1", userRole: UserRole.Client }

        // console.log("🚀 ~ file: [...nextauth].ts:93 ~ authorize ~ user:", user)

        // return { id: user._id };
        // return user as Awaitable<User | null>;

        // let u: User;
        // u.hashedPassword
        // return new Promise<User>((resolve, reject) => resolve(user as unknown as User));
        // return user as unknown as PromiseLike<User | null>;
        // return user;
        // const user1 = { id: 1, name: "J Smith", email: "jsmith@example.com" }
        // return user1;
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
        // if (credentials?.password == "hello123") {
        //   return user
        // } else {
        //   return null;
        // }
      }
    })
    /*
 EmailProvider({
     server: process.env.EMAIL_SERVER,
     from: process.env.EMAIL_FROM,
   }),
// Temporarily removing the Apple provider from the demo site as the
// callback URL for it needs updating due to Vercel changing domains

Providers.Apple({
  clientId: process.env.APPLE_ID,
  clientSecret: {
    appleId: process.env.APPLE_ID,
    teamId: process.env.APPLE_TEAM_ID,
    privateKey: process.env.APPLE_PRIVATE_KEY,
    keyId: process.env.APPLE_KEY_ID,
  },
}),

GithubProvider({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
}),
GoogleProvider({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
}),
TwitterProvider({
  clientId: process.env.TWITTER_ID,
  clientSecret: process.env.TWITTER_SECRET,
}),
Auth0Provider({
  clientId: process.env.AUTH0_ID,
  clientSecret: process.env.AUTH0_SECRET,
  issuer: process.env.AUTH0_ISSUER,
}),
*/
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("🚀 ~ file: [...nextauth].ts:139 ~ jwt ~ token:", token)
      // console.log("🚀 ~ file: [...nextauth].ts:139 ~ jwt ~ user:", user)
      // user.userRole

      if (user?.userRole) token.userRole = user.userRole;
      console.log(user?.isCompleted)
      if(user?.isCompleted!==undefined) token.isCompleted = user?.isCompleted;

      // console.log("🚀 ~ file: [...nextauth].ts:135 ~ jwt ~ token:", token)
      // token.email
      // token.
      return token
    },

    async session({ session}) {
      // console.log("🚀 ~ file: [...nextauth].ts:143 ~ session ~ token:", token)
      // console.log("🚀 ~ fil/e: [...nextauth].ts:144 ~ session ~ user:", user)
      // console.log("🚀 ~ file: [...nextauth].ts:146 ~ session ~ session:", session)
      // to be imported

      // to be in
      // session.user.id = user.id;
      // session.user.userRole = UserRole.Client;
      return session;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   return user.isCompleted;
    // }

  },
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  }



}

export default NextAuth(authOptions)
