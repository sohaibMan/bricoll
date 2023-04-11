import cookie from "cookie";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/mongodb";
import { getToken } from "next-auth/jwt";
import { UserRole } from "../../../types/resolvers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userRole } = req.body;
  console.log(userRole);

  if (!userRole)
    return res.status(401).json({
      message: "Choose if you want to join as a client or freelancer",
    });

  setCookie("userRole", userRole, { req, res, maxAge: 60 * 60 * 24 });
  // res.setHeader();
  res.status(200).json({
    message: "You choosed the profile type successfuly!",
    data: userRole,
  });
}
