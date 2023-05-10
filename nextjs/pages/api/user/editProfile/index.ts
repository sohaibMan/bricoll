import db from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { redis } from "../../../../lib/redis";
import { getToken } from "next-auth/jwt";
import { User } from "../../../../types/resolvers";

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

    if (!req.body.name || !req.body.email || !req.body.image)
      return res.status(401).json({
        status: "failed",
        message: "Missing fields",
      });

    const token = await getToken({ req });

    if (!token)
      return res.status(401).json({
        status: "failed",
        message: "You cannot update your information account, Try to logging!",
      });

    // const user = await db.collection("users").findOne({ _id: id });

    // console.log("user: ", user);

    // if (!user && !token) {
    //   return res.status(401).json({
    //     status: "failed",
    //     message: "You cannot update your information account, Try to logging!",
    //   });
    // }

    // const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    // console.log("decoded: ", decoded);

    // if (decoded.sub !== user?._id.toString()) {
    //   return res.status(401).json({
    //     status: "failed",
    //     message: "Something is wrong, Try to logging!",
    //   });
    // }

    const user = (await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(token.sub) },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          image: req.body.image,
        },
      }
    )) as unknown as User;

    // ? Caching the new data
    await redis.set(user.email, JSON.stringify(user));

    res.status(200).json({
      status: "success",
      // message:
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}
