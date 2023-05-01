// import React, { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import Chat from './components/Chat';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// const ChatPage = () => {
//   const {data: session} = useSession();
//   const [receiverUser, setReceiverUser] = useState<User | null>(null);

//   const handleSelectUser = (user: User) => {
//     setReceiverUser(user);
//   };

//   return (
//     <div>
//       <h1>Chat</h1>

//       {receiverUser ? (
//         <Chat receiverUser={receiverUser} />
//       ) : (
//         <ul>
//           {session?.users.map((user: User) => (
//             <li key={user.id}>
//               <button onClick={() => handleSelectUser(user)}>{user.name}</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )}

import React from 'react';
import { useSession } from 'next-auth/react';
import Chat from './components/Chat';

const ChatPage = () => {

  // if (!session) {
  //   // User is not authenticated, redirect to login page or show a message
  //   return <div>Please sign in to view this page</div>;
  // }

  const receiverUser = { id: 2, name: 'anas zn', email: 'anas.zn@example.com' }; 

  return (
    
    <div>
      <h1>Chat</h1>
      <Chat receiverUser={receiverUser} />
    </div>
  );
};

export default ChatPage;


