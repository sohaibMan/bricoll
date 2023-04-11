import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import { User } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { UserRole } from "../../../types/resolvers.d";
import { clientPromise } from "../../../lib/mongodb";
import { JWT } from "next-auth/jwt";

// import { User } from "next-auth/jwt";
// import { User } from "next-auth/jwt";
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  // // enabe JWT
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

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
      async authorize(credentials, req) {
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
        // console.log(credentials);

        // return user
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = (await db
          .collection("users")
          .findOne({ email: credentials.email })) as unknown as User | null;
        // console.log("🚀 ~ file: [...nextauth].ts:57 ~ authorize ~ user:", user)
        // console.log(user);

        // TODO : We have to validate the email using a third-party library like validator.js

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // TODO : generating the token using headers authorization
        // const token = jwt.sign({ id }, process.env.NEXTAUTH_SECRET, {
        //   expires: new Date(
        //     Date.now() +  24 * 60 * 60 * 1000
        //   ),
        //   httpOnly: true,
        //   secure: true,
        // });
        // console.log(user);

        return user;
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
  debug: true,
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   const isAllowedToSignIn = true;
    //   if (isAllowedToSignIn) {
    //     return true;
    //   } else {
    //     // Return false to display a default error message
    //     return false;
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },
    
    // async jwt({ token }) {
    //   token.userRole = "client"
    //   return token
    // },
    async jwt({ token, user, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // console.log(user, token, profile);

      // token.accessToken = user.access_token;
      token.id = user.id;
      // token.email = user?.email;
      token.email = user.email;
      // token.userRole = user.userRole
      token.userRole = "Client";
      console.log(token);

      return token;
    },
    async session({ session, user, token }) {
      console.log("🚀 ~ file: [...nextauth].ts:140 ~ session ~ token:", token);
      console.log("🚀 ~ file: [...nextauth].ts:140 ~ session ~ user:", user);
      console.log(
        "🚀 ~ file: [...nextauth].ts:140 ~ session ~ session:",
        session
      );
      // to be imported
      // enum UserRole {
      //   Guest,
      //   Client,
      //   Freelancer
      // }
      // to be in
      session.user.id = user.id;
      session.user.userRole = UserRole.Client;

      return session;
    },
  },
  // jwt: {
  //   async encode(params: {
  //     token: JWT;
  //     secret: string;
  //     maxAge: number;
  //   }): Promise<string> {
  //     // return a custom encoded JWT string
  //     return new Promise((resolve, reject) =>
  //       resolve(
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  //       )
  //     );
  //   },
  //   async decode(params: {
  //     token: string;
  //     secret: string;
  //   }): Promise<JWT | null> {
  //     // return a `JWT` object, or `null` if decoding failed
  //     return {};
  //   },
  // },
};

export default NextAuth(authOptions);
