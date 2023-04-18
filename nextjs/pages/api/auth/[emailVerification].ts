import cookie from "cookie";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newToken = req.query["emailVerification"]?.toString();

    const oldToken = getCookie("jwt", { req, res });

    if (newToken !== oldToken) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid token !",
      });
    }

    // Todo : redirect to the login page

    res.status(200).json({
      status: "success",
      message: "Your account is verified successfuly !",
    })
    
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
}
