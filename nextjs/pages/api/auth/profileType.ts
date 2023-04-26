import { setCookie} from "cookies-next";
import {NextApiRequest, NextApiResponse} from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {userRole} = req.body;
    // console.log(userRole);

    if (!userRole)
        return res.status(401).json({
            message: "Choose if you want to join as a client or freelancer",
        });


    setCookie("userRole", userRole, {req, res, maxAge: 60 * 60 * 24});
    // res.setHeader();
    res.status(200).json({
        message: "You choosed the profile type successfuly!",
        data: userRole,
    });
}
