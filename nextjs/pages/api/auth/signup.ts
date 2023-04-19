import bcrypt from "bcrypt";
// import cookie from "cookie";
import validate from 'deep-email-validator'
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/mongodb";
// import { getToken } from "next-auth/jwt";
import { User } from "../../../types/resolvers";
import {deleteCookie, getCookie, setCookie} from "cookies-next";
import jwt from "jsonwebtoken";
import emailService from "../../../lib/email";
// import { ObjectId } from "mongodb";
// import getConfig from "next/config";


    const userCollection = db.collection("users");
// const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // todos (validate user existence and add infos ...)

    const userRole = getCookie("userRole", { req, res });

    // console.log(userRole);

    // const userRole = getCookie("userRole");
    // console.log(userRole);

    if (!userRole) {
      return res.redirect("http://localhost:3000/api/auth/profileType");
    }

    // console.log(userRole);


    const userData: User = await req.body;
    const { email, name, password } = userData;
    // const isCompleted = false;

    // ? Verifying the incoming data from the user
    if (!email || !name || !password) {
      // throw new Error('There are some fields not filling them yet!')
      return res.status(400).json({ message: "Missing fields" });
    }
    const emailValidation = await validate(email);
    if(!emailValidation.valid){
      return res.status(400).json({message: 'Invalid email '+emailValidation.reason})
    }
    // todo (validate email, password, username length)
    // ? Verifying if the password and passwordConfirm are the same
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).json({
        status: "failed",
        message: "The password and passwordConfirm are not the same !",
      });
    }

    // ? Checking if the user's email is existed in DB
    // todo (create an index on email field)
    const existedUser = await userCollection.findOne({ email: req.body.email });
    if (existedUser) {
      return res.status(400).json({
        status: "failed",
        message: "This email is already exists !",
      });
    }


    // ? Hashing the password
    // if password is too short
    // if username is too short
    // if email already exists
    const hashedPassword = await bcrypt.hash(password, 10);

    // ? Inserting the user information into DB

    const user = await userCollection.insertOne({
      email,
      name,
      hashedPassword,
      userRole,
      isCompleted:false,
      created_at: new Date(),
      isEmailVerified: false,
    });



    // const { insertedId } = user;
    // console.log(insertedId.toString());

    // const userId = insertedId.toString();



    

    // ? redirecting to the email verification page

    // ? clear the cookie of userRole property

    //* Genrating Token
    const token = jwt.sign({ user_id: user.insertedId.toString() }, process.env.NEXTAUTH_SECRET, {
      expiresIn: "70d",
    });

    // console.log("token : ", token);

    // const cookieOptions = {
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    //   secure: true,
    // };

    // res.setHeader("jwt", cookie.serialize("jwt", token, cookieOptions));
    setCookie("jwt", token, { req, res, maxAge: 60 * 60 * 24 });
    deleteCookie("userRole", { req, res })

    // setCookie("userId", userId, { req, res, maxAge: 60 * 60 * 24 });
    // setCookie("emailVerificationToken", token, { req, res, maxAge: 60 * 60 * 24 });

    // ? Sending the email to verify the account
    // const emailVerification = `http://localhost:3000/api/auth/${token}`;
    const emailVerificationLink = `http://localhost:3000/api/auth/emailVerification/${token}`;
    const text = `To verify your email please click on this link : <a href="${emailVerificationLink}">Click me</a>.`;

    emailService.sendEmail({
      to: `${email}`,
      from: "zenaguianas20@gmail.com",
      subject: "Email Verification !",
      html: `<p>${text}</p>`
    });


    // ? sending the success response
    // TODO : Redirection to '/api/auth/emailVerification' then '/api/auth/createProfile' route after the registration
    return res.status(201).json({
      status: "success",
      // token: token,
      data: {
        userData,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
}
