import { NextApiRequest, NextApiResponse } from 'next';
import {pusher} from '../../lib/pusher';

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


  const channel = pusher.trigger(`private-chat-${message.senderUserId}-${message.receiverUserId}`, 'new-message', message);

  res.status(200).json(message);
}
