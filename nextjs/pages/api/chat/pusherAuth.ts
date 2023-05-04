// import pusher from '../../../lib/pusher';
import {NextApiHandler} from 'next';
import {getSession} from 'next-auth/react';
import {pusher} from "../../../lib/pusher";


interface presenceDataType {
    user_id: any
}

const pusherAuthHandler: NextApiHandler = async (req, res) => {
    const session = await getSession({req});

    // console.log("session in pusherAuth ", session);


    if (!session) {
        return res.status(401).send('Unauthorized');
    }

    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const presenceData: presenceDataType = {
        user_id: session.user.email,
    };

    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
};

export default pusherAuthHandler;