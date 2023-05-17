// import {setCookie} from "cookies-next";
// import {NextApiRequest, NextApiResponse} from "next";
// import {UserRole} from "../../../types/resolvers";
//
//
// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method !== "POST") {
//         return res.status(405).json({
//             message: "Only POST requests are allowed",
//         });
//     }
//
//
//     if (!req.body) {
//         return res.status(401).json({
//             message: "Choose if you want to join as a Client or Freelancer",
//         });
//     }
//
//
//     const userRole = JSON.parse(req.body).userRole;
//     console.log(req.body)
//     console.log(userRole)
//
//
//     if (!userRole)
//         return res.status(401).json({
//             message: "Choose if you want to join as a Client or Freelancer",
//         });
//     if (userRole !== UserRole.Client && userRole !== UserRole.Freelancer)
//         return res.status(401).json({
//             message: "Choose if you want to join as a Client or Freelancer",
//         });
//
//
//     setCookie("userRole", userRole, {req, res, maxAge: 60 * 60 * 24});
//
//     res.status(200).json({
//         status: "success",
//         message: "You chose the profile type successfully!"
//     });
// }
//
 // we can set the cookie from the Client side