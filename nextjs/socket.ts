// // import { Server } from "socket.io";
// // import { NextApiRequest, NextApiResponse } from "next";

// // const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
// //   if (res.socket?.server.io) {
// //     console.log("Socket is already running");
// //   } else {
// //     console.log("Socket is initializing");
// //     const io = new Server(res.socket?.server);
// //     if (res.socket) res.socket.server.io = io;

// //     io.on("connection", (socket) => {
// //       socket.on("input-change", (msg) => {
// //         socket.broadcast.emit("update-input", msg);
// //       });
// //     });
// //   }
// //   res.end();
// // };

// // export default SocketHandler;

// import http from "http";
// import { Server } from "socket.io";

// // Create a new HTTP server instance
// const server = http.createServer();

// // Create a new Socket.IO server instance
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// // Handle new connections to the server
// io.on("connection", (socket) => {
//   console.log("User connected");

//   // Handle incoming chat messages
//   socket.on("message", (message) => {
//     console.log(`Message received: ${message}`);
//     io.emit("message", message);
//   });

//   // Handle disconnections from the server
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // Start the server
// const port = 3000;
// server.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });



