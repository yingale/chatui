import ChatArea from "./ChatArea";
import ChatSidebar from "./ChatSidebar";

function ChatMain({receiver, receiverId, type, disabled}) {
  return (
    <main className="columns">
      <ChatSidebar receiver={receiver} receiverId={receiverId} type={type} disabled={disabled} />
      {disabled && (
      <ChatArea  receiver={receiver} receiverId={receiverId} type={type} disabled={disabled}  />
      )}
    </main>
  );
}

export default ChatMain;
