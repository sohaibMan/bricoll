import {NextApiRequest, NextApiResponse} from "next";
import db from "../../../lib/mongodb";
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


        const bio: string = req.body.bio
        const country: string = req.body.country
        const city: string = req.body.city
        const phone: string = req.body.phone
        const address: string = req.body.address
        const language: string = req.body.language
        const image: string = req.body.image
        const profileTitle: string = req.body.profileTitle
        const experienceLevel: string = req.body.experienceLevel
        const category: string = req.body.category
        const jobTitle: string = req.body.jobTitle
        const company: string = req.body.company
        const educationLevel: string = req.body.educationLevel
        const portfolio: string = req.body.portfolio
        const skills: string[] = req.body.skills

        if (!bio || !country || !city || !phone || !address || !language || !image || !profileTitle || !experienceLevel || !category || !jobTitle || !company || !educationLevel || !portfolio || !skills
        ) {
            const errors = [];
            if (!bio) errors.push("bio");
            if (!country) errors.push("country");
            if (!city) errors.push("city");
            if (!phone) errors.push("phone");
            if (!address) errors.push("address");
            if (!language) errors.push("language");
            if (!image) errors.push("image");
            if (!profileTitle) errors.push("profileTitle");
            if (!experienceLevel) errors.push("experienceLevel");
            if (!category) errors.push("category");
            if (!jobTitle) errors.push("jobTitle");
            if (!company) errors.push("company");
            if (!educationLevel) errors.push("educationLevel");
            if (!portfolio) errors.push("portfolio");
            if (!skills) errors.push("skills");

            return res.status(400).json({
                status: "failed",
                message: "Please fill all the fields! " + errors.join(", ")
            });
        }

        const newUser = {
            address,
            jobTitle,
            bio,
            country,
            city,
            phone,
            language,
            image,
            profileTitle,
            experienceLevel,
            category,
            company,
            educationLevel,
            portfolio,
            skills,
            reviews: [],
            payments: []
        }

        // isCompleted: true,

        // const userId: any = getCookie("userId", { req, res });
        const userToken = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
        ;

        if (!userToken) {
            return res.status(401).json({status: "failed", message: "Unauthorized!"});
        }

        // const user_id = userTokenDecoded.user_id;
        const user_id = userToken.sub;


        const user = await db
            .collection("users")
            .findOne({_id: new ObjectId(user_id)});

        if (user?.isCompleted === true) {
            return res.redirect("/");
        }

        // const { bio, level, language } = req.body;
        let email = user?.email;


        const newUserData = await db.collection("users").findOneAndUpdate(
            {_id: new ObjectId(user_id)},
            {
                $set: {...newUser, isCompleted: true, access_token: getCookie("jwt"),},
            }
        );

        // console.log("newUserInfo: ", newUserData);

        // ? Caching the data
        await redis.set(email, JSON.stringify(newUserData.value));

        res.status(201).json({status: "success", message: "Updated successfully!"});

        // console.log("decoded : ", decoded);
    } catch
        (error) {
        res.status(500).json({
            status: "failed", message: error,
        });
    }
}
