import React from "react";
import ChatComponent from "../components/ChatComponent";

const OtherPage: React.FC = () => {
  const receiverUser = {
    id: "646509dfc0edd86d1253454e",
    name: "anas zn",
    email: "anas.zn@example.com",
  };

  return (
    <div>
      {/* Render the chat component */}
      <ChatComponent receiverUser={receiverUser} />
    </div>
  );
};

export default OtherPage;
