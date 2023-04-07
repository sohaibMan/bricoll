 import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// import jwt from "jsonwebtoken";
// // import { getToken } from "next-auth/jwt";

// import db from "../lib/mongodb";
// import { stringify } from "querystring";
// const userCollection = db.collection("users");

// const saltRounds: number = 10;

// export const UserResolvers: Resolvers = {
//   // Query: {},

//   Mutation: {
//     signup: async (parent, args, contextValue, info) => {
//       const user = await userCollection.findOne({ email: args.email });

//       // ? Checking if the user is existed in DB
//       if (user) {
//         throw new Error("This email is already exists !");
//       }

//       // ? Checking if the password and passwordConfirm are the same
//       // if (args.password !== args.passwordConfirm) {
//       //   throw new Error("The passwords are not the same !");
//       // }

//       // ? Hashing the password before inserting the user to database
//       // // const hashPassword = await bcrypt.hash(args.password, 10);

//       let hashPassword = await bcrypt.hash(args.password, 10);

//       const userData = {
//         name: args.name,
//         email: args.email,
//         role: args.role,
//         password: hashPassword,
//       };

//       const newUser = await userCollection.insertOne(userData);

//       // ? Generating the token for a user
//       // const token = jwt.sign({email: args.email}, process.env.NEXTAUTH_SECRET, {expiresIn: '1h'});

//       return userData;
//     },
//   },
// };
