import { NextApiRequest, NextApiResponse } from 'next';
import {pusher} from '../../lib/pusher';
import {ObjectId} from "mongodb";

interface Message {
  id: ObjectId;
  senderUserId: ObjectId;
  receiverUserId: ObjectId;
  text: string;
  createdAt: Date;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { senderUserId, receiverUserId, text } = req.body;

  if (!receiverUserId || !text) {
    res.status(400).send('Bad request');
    return;
  }

  const message: Message = {
    id: new ObjectId(), // generate a random ID for the message
    senderUserId,
    receiverUserId,
    text,
    createdAt: new Date()
  };
  // console.log(`private-chat-1`)

 await pusher.trigger(`private-chat-1`, 'new-message', message);

  res.status(200).json(message);
}
