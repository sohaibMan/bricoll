// import { NextApiRequest, NextApiResponse } from "next";
// import { pusher } from "../../../lib/pusher";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { socket_id, channel_name, username } = req.body;

//   const randomString = Math.random().toString(36).slice(2).length;

//   const presenceData: any = {
//     user_id: randomString,
//     user_info: {
//       username,
//     },
//   };

//   try {
//     const auth = pusher.authenticate(socket_id, channel_name, presenceData);
//   } catch (error) {
//     console.error(error);
//   }
// }
