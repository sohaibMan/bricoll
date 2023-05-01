import type { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";
import { getSession } from "next-auth/react";
import db from "../../lib/mongodb";
// import prisma from "../../lib/prisma";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSH_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).send("Unauthorized");
      return;
    }

    const { sender, recipient, message } = req.body;

    const chat = await db.collection("users").insertOne({
      data: {
        sender: { connect: { id: sender } },
        recipient: { connect: { id: recipient } },
        message,
      },
    });

    const chatData = {
      // id: chat.id,
      sender,
      recipient,
      message,
    };

    pusher.trigger("chat", "new-message", chatData);

    res.status(200).send("Message sent.");
  }
}