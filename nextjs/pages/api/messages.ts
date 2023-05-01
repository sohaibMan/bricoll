import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

interface Message {
  id: number;
  senderUserId: number;
  receiverUserId: number;
  text: string;
  createdAt: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { senderUserId, receiverUserId, text } = req.body;

  if (!receiverUserId || !text) {
    res.status(400).send('Bad request');
    return;
  }

  const message: Message = {
    id: Math.floor(Math.random() * 1000000), // generate a random ID for the message
    senderUserId,
    receiverUserId,
    text,
    createdAt: new Date().toISOString(),
  };

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_KEY,
    secret: process.env.PUSHER_KEY,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
  });

  const channel = pusher.trigger(`private-chat-${message.senderUserId}-${message.receiverUserId}`, 'new-message', message);

  res.status(200).json(message);
}
