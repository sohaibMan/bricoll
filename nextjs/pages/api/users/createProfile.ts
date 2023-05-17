import {NextApiRequest, NextApiResponse} from "next";
import db from "../../../lib/mongodb";
// import { getToken } from "next-auth/jwt";
// import { User, UserRole } from "../../../types/resolvers";
// import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
// import jwt from "jsonwebtoken";
import {ObjectId} from "mongodb";
import {getToken} from "next-auth/jwt";
import {getCookie} from "cookies-next";
import {redis} from "../../../lib/redis";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // ? Checking if the
        // const token: any = req.headers.authorization?.split(" ")[1];

        // console.log('token v2 : ', token);

        //   const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        //   console.log("decoded : ", decoded);


        const bio = req.body.bio
        const country = req.body.country
        const city = req.body.city
        const phone = req.body.phone
        const language = req.body.language
        const photo = req.body.photo
        const profileTitle = req.body.profileTitle
        const experienceLevel = req.body.experienceLevel
        const category = req.body.category
        const jobTitle = req.body.job
        const company = req.body.company
        const educationLevel = req.body.educationLevel
        const portfolio = req.body.portfolio

        if (!bio || !country || !city || !phone || !language || !photo || !profileTitle || !experienceLevel || !category || !jobTitle || !company || !educationLevel || !portfolio) {
            return res.status(400).json({message: "Please fill all the fields!"})
        }

        // const userId: any = getCookie("userId", { req, res });
        const userToken = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
        // getCookie("jwt", {req, res});

        // console.log('userId : ', userToken);

        // const userTokenDecoded = jwt.verify(
        //   JSON.stringify(userToken),
        //   process.env.NEXTAUTH_SECRET
        // ) as { user_id: string };

        // console.log("userTokenDe, ", userTokenDecoded);

        if (!userToken) {
            return res.status(401).json({message: "Unauthorized!"});
        }

        // const user_id = userTokenDecoded.user_id;
        const user_id = userToken.sub;

        // console.log("userid, ", user_id);

        // const cachedValue = await redis.get(user_id);

        // if(cachedValue){
        //   return
        // }

        const user = await db
            .collection("users")
            .findOne({_id: new ObjectId(user_id)});
        // const user_id = userTokenDecoded.user_id;
        // const users = await db.collection("users").findOne({_id: new ObjectId(user_id)});

        // await redis.set(user_id, JSON.stringify(users))

        // console.log("users ", users);

        if (user?.isCompleted === true) {
            return res.redirect("/");
        }

        // const { bio, level, language } = req.body;
        let email = user?.email;


        // console.log("req ", req.body);

        // console.log(email, name, hashedPassword, userRole);

        // const { isCompleted }: any = users;

        // todo some validation on users input
        // this is important to the dashboard todo fix this crap/


        const newUserData = await db.collection("users").findOneAndUpdate(
            {_id: new ObjectId(user_id)},
            {
                $set: {
                    isCompleted: true,
                    bio,
                    country,
                    city,
                    phone,
                    language,
                    photo,
                    profileTitle,
                    experienceLevel,
                    category,
                    jobTitle,
                    company,
                    educationLevel,
                    portfolio,
                    access_token: getCookie("jwt", {req, res}),
                    reviews: [],
                    payments: []
                },
            }
        );

        console.log("newUserInfo: ", newUserData);

        // ? Caching the data
        await redis.set(email, JSON.stringify(newUserData));

        // TODO : Differencing between the users (client or freelancer)

        // TODO : Redirection to the '/api/auth/signin' and clearing the cookies
        res.status(201).json({message: "Updated successfuly!"});

        // console.log("decoded : ", decoded);
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error,
        });
    }
}
