import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/mongodb";
import { getToken } from "next-auth/jwt";
import { User, UserRole } from "../../types/resolvers";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    deleteCookie("jwt", { req, res });

    res.status(200).json({
      status: "success",
      message: "You're logout successfuly!",
    });

    // TODO: Redirecting to the login page in client side

    // res.send("You're logout successfuly!");
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
}
