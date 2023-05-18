import bcrypt from "bcrypt";
import validate from 'deep-email-validator'
import {NextApiRequest, NextApiResponse} from "next";
import db from "../../../lib/mongodb";
import {deleteCookie, setCookie} from "cookies-next";
import jwt from "jsonwebtoken";
import {sendEmailVerification} from "../../../email/notifyEmail";
import {redis} from "../../../lib/redis";


const userCollection = db.collection("users");


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Only POST requests are allowed",
        });
    }

    try {
        // todos (validate users existence and create infos ...)

        // const userRole = getCookie("userRole", {req, res});
        const parsedBody = JSON.parse(req.body);

        console.log("req.body ", parsedBody);
        

        const email = parsedBody.email;
        const username = parsedBody.username;
        const password = parsedBody.password;
        const userRole = parsedBody.userRole;
        const passwordConfirm = parsedBody.passwordConfirm;

        if (!userRole) {
            //todo redirect to the choose role page
            return res.status(400).json({
                status: "failed",
                message: "You are not allowed to create an account ! before choosing your role",
            });
        }

        // ? Verifying the incoming data from the users
        if (!email || !username || !password || !passwordConfirm) {
            // throw new Error('There are some fields not filling them yet!')
            return res.status(400).json({message: "Missing fields"});
        }
        const emailValidation = await validate(email);
        if (!emailValidation.valid) {
            return res.status(400).json({message: 'Invalid email ' + emailValidation.reason})
        }

        // ? Verifying if the password and passwordConfirm are the same
        if (password !== passwordConfirm) {
            return res.status(400).json({
                status: "failed",
                message: "The password and passwordConfirm are not the same !",
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                status: "failed",
                message: "The password is too short !",
            });
        }
        if (username.length < 3) {
            return res.status(400).json({
                status: "failed",
                message: "The username is too short !",
            });
        }



        // ? Checking if the users's email is existed in DB
        // index scan (email) (the
        const cachedUser = await redis.get(email);
        if (cachedUser) {
            return res.status(400).json({
                status: "failed",
                message: "This email is already exists !",
            });
        }
        const existedUser = await userCollection.findOne({email});
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

        // ? Inserting the users information into DB

        const userData = {
            email,
            username,
            hashedPassword,
            userRole,
            isCompleted: false,
            created_at: new Date(),
            isEmailVerified: false,
        }

        const user = await userCollection.insertOne(userData);
        await redis.set(email, JSON.stringify(userData))


        //* Generating Token
        const token = jwt.sign({user_id: user.insertedId.toString()}, process.env.NEXTAUTH_SECRET, {
            expiresIn: "70d",
        });


        // res.setHeader("jwt", cookie.serialize("jwt", token, cookieOptions));
        setCookie("jwt", token, {req, res, maxAge: 60 * 60 * 24});
        deleteCookie("userRole", {req, res})


        // ? Sending the email to verify the account
        const emailVerificationLink = `${process.env.NEXTAUTH_URL}/users/emailverification/${token}`;

        await sendEmailVerification(email, username, emailVerificationLink);


        // ? sending the success response
        return res.status(201).json({
            status: "success",
            message: "profile create successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error,
        });
    }
}
