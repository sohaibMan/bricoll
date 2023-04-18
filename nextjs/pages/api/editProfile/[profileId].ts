import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/mongodb";
import { getToken } from "next-auth/jwt";
import { User, UserRole } from "../../../types/resolvers";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
// import { useRouter } from "next/router";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//   try {
//     //? Extracting the user ud
//     // const userId = req.query;

//     const {userId}: any = useRouter

//     const currentUser = await db.collection('users').findOneAndUpdate({_id: userId}, {
//       email: req.body.email,
//       name: req.body.name,

//     })

//     // ? Updating the user info

//   } catch (error) {
//     res.status(500).json({
//       status: 'failed',
//       message: error
//     })
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const router = useRouter();

    const profileId = req.query["profileId"]?.toString();

    // console.log(profileId);

    const id = new ObjectId(profileId);

    console.log("id: ", id);

    const user = await db.collection("users").findOne({ _id: id });

    // console.log("user: ", user);

    const token: any = getCookie("jwt", { req, res });

    console.log("token: ", token);

    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.startsWith("Bearer")
    // ) {
    //   token = req.headers.authorization.split(" ")[1];
    // }

    // console.log(token);

    if (!user && !token) {
      return res.status(401).json({
        status: "failed",
        message: "You cannot update your information account, Try to logging!",
      });
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    console.log("decoded: ", decoded);

    if (decoded.sub !== user?._id.toString()) {
      return res.status(401).json({
        status: "failed",
        message: "Something is wrong, Try to logging!",
      });
    }

    if (req.body.password || req.body.passwordConfirm) {
      return res.status(400).json({
        status: "failed",
        message:
          "Sorry cannot update the password, try to use this route /updateMyPassword !",
      });
    }

    const newUserInfo = await db.collection("users").findOneAndUpdate(
      { _id: user?._id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}
