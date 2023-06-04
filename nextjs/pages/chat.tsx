import React from "react";
import ChatComponent from "../components/ChatComponent";
import { useRouter } from "next/router";

const chatPage: React.FC = () => {
  const router = useRouter();
  const { profileId, name, email } = router.query;

  const receiverUser = {
    id: profileId,
    name: name as string,
    email: email as string,
  };

  return (
    <div>
      {/* Render the chat component */}
      <ChatComponent receiverUser={receiverUser} />
    </div>
  );
};

export default chatPage;
