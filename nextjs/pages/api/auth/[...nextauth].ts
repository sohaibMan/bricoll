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

  // console.log("queried data from Redis ...");

  return {
    id: user._id.toString(),
    userRole: user.userRole as UserRole,
    email: user.email,
    name: user.name,
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

        // return user
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          const cacheResults = await redis.get(credentials.email);
          if (cacheResults) {
            user = JSON.parse(cacheResults);

            // console.log("queried data from Redis Database ...",user)
            // console.log("verfication",await verifyUserData(user, credentials.password))

            return await verifyUserData(user, credentials.password);
          }
          // console.log("cache miss ...")
          user = await db
            .collection("users")
            .findOne({ email: credentials.email });

          // console.log("queried data from MongoDB ...")

          // Caching the da
          // ta via Redis
          await redis.set(credentials.email, JSON.stringify(user));

          return await verifyUserData(user, credentials.password);
        } catch (err: any) {
          // todo :handle error
          throw new Error(err);
          //
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
      },
    }),
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
    async jwt({ token, user, account }) {
      // console.log("🚀 ~ file: [...nextauth].ts:139 ~ jwt ~ token:", token)
      // console.log("🚀 ~ file: [...nextauth].ts:139 ~ jwt ~ user:", user)
      // user.userRole

      if (user?.userRole) token.userRole = user.userRole;
      // console.log(user?.isCompleted)
      if (user?.isCompleted !== undefined)
        token.isCompleted = user?.isCompleted;

      // if (account) {
      //   token.accessToken = account.access_token;
      // }

      if ((account && account.access_token) || (user && user.accessToken) ) {
        token.accessToken = account?.access_token || user.accessToken;
      }

      // console.log("🚀 ~ file: [...nextauth].ts:135 ~ jwt ~ token:", token)
      // token.email
      // token.

      // console.log("user v3:  ", user);

      return token;
    },

    async session({ session, token, user }) {
      // console.log("🚀 ~ file: [...nextauth].ts:143 ~ session ~ token:", token)
      // console.log("🚀 ~ fil/e: [...nextauth].ts:144 ~ session ~ user:", user)
      // console.log("🚀 ~ file: [...nextauth].ts:146 ~ session ~ session:", session)
      // to be imported

      // to be in
      session.user.id = token.sub;
      // session.user.userRole = UserRole.Client;
      session.user.accessToken = token.accessToken;
      // console.log(session);

      

      return session;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   return user.isCompleted;
    // }
  },
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
