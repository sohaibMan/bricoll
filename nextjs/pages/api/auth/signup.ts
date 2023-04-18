import bcrypt from "bcrypt";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/mongodb";
import { getToken } from "next-auth/jwt";
import { User, UserRole } from "../../../types/resolvers";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import getConfig from "next/config";
import sgMail from "@sendgrid/mail";

const secret = process.env.NEXTAUTH_SECRET;

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
      res.redirect(400, "/api/auth/profileType");
    }

    // console.log(userRole);

    const userCollection = db.collection("users");

    const userData: User = await req.body;
    const { email, name, password } = userData;
    const isCompleted = false;

    // ? Verifying the incoming data from the user
    if (!email || !name || !password) {
      // throw new Error('There are some fields not filling them yet!')
      return res.status(400).json({ message: "Missing fields" });
    }

    // ? Checking if the user's email is existed in DB
    const existedUser = await userCollection.findOne({ email: req.body.email });
    if (existedUser) {
      res.status(400).json({
        status: "failed",
        message: "This email is already exists !",
      });
    }

    // ? Verifying if the password and passwordConfirm are the same
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).json({
        status: "failed",
        message: "The password and passwordConfirm are not the same !",
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
      isCompleted,
      created_at: new Date(),
    });

    const { insertedId } = user;
    // console.log(insertedId.toString());

    const userId = insertedId.toString();

    

    // ? redirecting to the email verification page

    // ? clear the cookie of userRole property

    //* Genrating Token
    const token = jwt.sign({ sub: userId }, process.env.NEXTAUTH_SECRET, {
      expiresIn: "70d",
    });

    console.log("token : ", token);

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };

    // res.setHeader("jwt", cookie.serialize("jwt", token, cookieOptions));

    setCookie("jwt", token, { req, res, maxAge: 60 * 60 * 24 });
    setCookie("userId", userId, { req, res, maxAge: 60 * 60 * 24 });

    // ? Sending the email to verify the account
    const emailVerification = `http://localhost:3000/api/auth/${token}`;

    const text = `To verify your email please click on this link : <a href="${emailVerification}">Click me</a>.`;



    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
      to: `${email}`,
      from: "zenaguianas20@gmail.com",
      subject: "Email Verification !",
      html: `<p>${text}</p>`
    });


    // ? sending the success response
    // TODO : Redirection to '/api/auth/emailVerification' then '/api/auth/createProfile' route after the registration
    return res.status(201).json({
      status: "success",
      token: token,
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
