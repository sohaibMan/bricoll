import { Novu } from "@novu/node";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const novu = new Novu(process.env.NOVU_API_SECRET);

  const response = await novu.trigger("untitled", {
    to: {
      subscriberId: "test_user",
    },
    payload: {

    },
  });

  res.status(200).json({data: response.data})
} 

// export const sendNotification = async (body:DB){

// }