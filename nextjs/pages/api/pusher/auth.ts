import {NextApiRequest, NextApiResponse} from 'next';
import {pusher} from "../../../lib/pusher";
import {getToken} from "next-auth/jwt";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {socket_id, channel_name} = req.body;
    // console.log("socket id: ", socket_id);


    try {

        const token = await getToken({req})
        // console.log("user: ", token);

        if (!token || !token.sub || !token.name || !token.email) return res.status(404).json({message:"not authorized"})


        const channelData = {
            user_id: token.sub,
            user_info: {
                name: token.name,
                email: token.email,
            },
        };
        const authResponse =pusher.authorizeChannel(socket_id, channel_name, channelData);
        res.send(authResponse);
    } catch (error) {
        console.log((error as Error).stack);
        res.status(403).send('Forbidden');
    }
}
