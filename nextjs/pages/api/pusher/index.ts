// import { NextApiRequest, NextApiResponse } from "next";
// import Pusher from "pusher";

// export const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSH_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
//   useTLS: true,
// });

// export default async function handler(req: NextApiRequest, res:NextApiResponse) {
//   const { message, sender } = req.body;
//   const response = await pusher.trigger("chat", "chat-event", {
//     message,
//     sender,
//   });

//   res.json({ message: "completed" });
// }

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSH_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});