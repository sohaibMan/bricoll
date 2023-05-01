import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSH_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

const channelName = (user1: string, user2: string) => {
  const sortedUsers = [user1, user2].sort();
  return `private-user-${sortedUsers[0]}-to-${sortedUsers[1]}`;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sender, recipient, message } = req.body;

  const channel = channelName(sender, recipient);

  await pusher.trigger(channel, "client-chat", {
    sender,
    message,
  });

  res.status(200).end();
};
