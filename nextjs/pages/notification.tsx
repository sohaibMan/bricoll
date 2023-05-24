// import {
//   NovuProvider,
//   PopoverNotificationCenter,
//   NotificationBell,
//   IMessage,
// } from "@novu/notification-center";

// const Home = () => {
//   function onNotificationClick(message: IMessage) {
//     // your logic to handle the notification click
//     if (message?.cta?.data?.url) {
//       window.location.href = message.cta.data.url;
//     }
//   }

//   return (
//     <NovuProvider
//       subscriberId={"USER_ID"}
//       applicationIdentifier={"APP_ID_FROM_ADMIN_PANEL"}
//     >
//       <PopoverNotificationCenter
//         onNotificationClick={onNotificationClick}
//         colorScheme={"dark" || "light"}
//       >
//         {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
//       </PopoverNotificationCenter>
//     </NovuProvider>
//   );
// };

// export default Home;
export default () => {
    return (
        <h1>hello</h1>
    )
}
