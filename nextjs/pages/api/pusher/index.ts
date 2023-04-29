import { NextApiRequest, NextApiResponse } from "next";
import { pusher } from "../../../lib/pusher";

export default async function handler(
  req: NextApiRequest,  
  res: NextApiResponse
): Promise<void> {
  const { message, sender } = req.body;
  const response = await pusher.trigger("chat", "chat-event", {
    message,
    sender,
  });

  res.json({ message: "completed" });
}
