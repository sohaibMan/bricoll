import {NextApiRequest, NextApiResponse} from "next";
import {pusher} from "../../../lib/pusher";


const channelName = (user1: string, user2: string) => {
    const sortedUsers = [user1, user2].sort();
    return `private-user-${sortedUsers[0]}-to-${sortedUsers[1]}`;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {sender, recipient, message} = req.body;

    const channel = channelName(sender, recipient);

    await pusher.trigger(channel, "client-chat", {
        sender,
        message,
    });

    res.status(200).end();
};
