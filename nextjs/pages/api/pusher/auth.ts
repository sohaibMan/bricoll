import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSH_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { socket_id, channel_name } = req.body;

  console.log("socket id: ", socket_id);
  

  try {

    const {user}: any = await getSession({req})
    console.log("user: ", user);
    

    const channelData = {
      user_id: user.id,
      user_info: {
        name: user.name,
        email: user.email,
      },
    };

    const auth = pusher.authenticate(socket_id, channel_name, channelData);

    res.send(auth);
  } catch (error) {
    console.log(error);
    res.status(403).send('Forbidden');
  }
}
