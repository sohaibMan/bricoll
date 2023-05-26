import {NextApiRequest, NextApiResponse} from "next";
import db from "../../../lib/mongodb";
import {ObjectId} from "mongodb";
import {getToken} from "next-auth/jwt";
import {getCookie} from "cookies-next";
import {redis} from "../../../lib/redis";
import {UserRole} from "../../../types/resolvers";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // ? Checking if the

        const token = await getToken({req});

        if (!token) {
            return res
                .status(401)
                .json({status: "failed", message: "Unauthorized!"});
        }

        const userRole = req.body.userRole;
        if (!userRole) {
            return res.status(400).json({
                status: "failed",
                message: "You are not allowed to create an account ! before choosing your role",
            });
        }

        const bio: string = req.body.bio;
        const country: string = req.body.country;
        const city: string = req.body.city;
        const phone: string = req.body.phone;
        const address: string = req.body.address;
        const language: string = req.body.language;
        const image: string = req.body.image;
        const profileTitle: string = req.body.profileTitle;
        const experienceLevel: string = req.body.experienceLevel;
        const category: string = req.body.category;
        const jobTitle: string = req.body.jobTitle;
        const company: string = req.body.company;
        const educationLevel: string = req.body.educationLevel;
        const portfolio: string = req.body.portfolio;
        const skills: string[] = req.body.skills;

        const postalCode: number = req.body.postalCode;
        const timeZone: Date = req.body.timeZone;
        const companyName: string = req.body.companyName;
        const website: string = req.body.website;
        const industry: string = req.body.industry;
        const yearFounded: Date = req.body.yearFounded;
        const ownershipType: string = req.body.ownershipType;
        const skillsCategories: string = req.body.skillsCategories;
        const specificSkills: string = req.body.specificSkills;
        const skillsLevel: string = req.body.skillsLevel;


        const errors = [];

        if (!bio) errors.push("bio");
        if (!country) errors.push("country");
        if (!city) errors.push("city");
        if (!phone) errors.push("phone");
        if (!address) errors.push("address");
        if (!language) errors.push("language");
        if (!image) errors.push("image");

        if (userRole === UserRole.Freelancer) {
            if (
                !bio ||
                !country ||
                !city ||
                !phone ||
                !address ||
                !language ||
                !profileTitle ||
                !experienceLevel ||
                !category ||
                !company ||
                !image ||
                !jobTitle ||
                !educationLevel ||
                !portfolio ||
                !skills
            ) {


                if (!profileTitle) errors.push("profileTitle");
                if (!experienceLevel) errors.push("experienceLevel");
                if (!category) errors.push("category");
                if (!jobTitle) errors.push("jobTitle");
                if (!company) errors.push("company");
                if (!educationLevel) errors.push("educationLevel");
                if (!portfolio) errors.push("portfolio");

                return res.status(400).json({
                    status: "failed",
                    message: "Please fill all the fields! " + errors.join(", "),
                });
            }
        }

        if (userRole === UserRole.Client) {
            if (
                !bio ||
                !country ||
                !city ||
                !phone ||
                !address ||
                !language ||
                !image ||
                !postalCode ||
                !timeZone ||
                !companyName ||
                !website ||
                !industry ||
                !yearFounded ||
                !ownershipType ||
                !skillsCategories ||
                !specificSkills ||
                !skillsLevel
            ) {


                if (!postalCode) errors.push("postalCode");
                if (!timeZone) errors.push("timeZone");
                if (!companyName) errors.push("companyName");
                if (!website) errors.push("website");
                if (!industry) errors.push("industry");
                if (!yearFounded) errors.push("yearFounded");
                if (!ownershipType) errors.push("ownershipType");
                if (!skillsCategories) errors.push("skillsCategories");
                if (!specificSkills) errors.push("specificSkills");
                if (!skillsLevel) errors.push("skillsLevel");

                return res.status(400).json({
                    status: "failed",
                    message: "Please fill all the fields! " + errors.join(", "),
                });
            }
        }

        const newFreelancerUser = {
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
            payments: [],
            userRole
        };

        const newClientUser = {
            address,
            bio,
            country,
            city,
            phone,
            language,
            image,
            postalCode,
            timeZone,
            companyName,
            website,
            industry,
            yearFounded,
            ownershipType,
            skillsCategories,
            specificSkills,
            skillsLevel,
            reviews: [],
            payments: [],
            userRole
        };

        const newUser = (userRole === UserRole.Freelancer) ? newFreelancerUser : newClientUser;


        // const user_id = tokenDecoded.user_id;
        const user_id = token.sub;

        const user = await db
            .collection("users")
            .findOne({_id: new ObjectId(user_id)});

        if (user?.isCompleted === true) {
            return res.status(400).json({
                status: "failed",
                message: "User already completed the profile!"
            })
        }

        // const { bio, level, language } = req.body;
        let email = user?.email;

        const newUserData = await db.collection("users").findOneAndUpdate(
            {_id: new ObjectId(user_id)},
            {
                $set: {...newUser, isCompleted: true, access_token: getCookie("jwt")},
            }
        );

        // console.log("newUserInfo: ", newUserData);

        // ? Caching the data
        await redis.set(email, JSON.stringify(newUserData.value));

        res
            .status(201)
            .json({status: "success", message: "Updated successfully!"});

        // console.log("decoded : ", decoded);
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error,
        });
    }
}
