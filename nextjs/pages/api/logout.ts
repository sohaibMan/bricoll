import {NextApiRequest, NextApiResponse} from "next";
import {deleteCookie} from "cookies-next";

export default async function logout(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        deleteCookie("jwt", {req, res});

        // res.status(200).json({
        //     status: "success",
        //     message: "You're logout successfully!",
        // });

        // TODO: Redirecting to the login page in client side
        res.redirect(302, process.env.NEXT_PUBLIC_NEXTAUTH_URL)

        // res.send("You're logout successfuly!");
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error,
        });
    }
}
