import { useEffect, useRef } from 'react';
import Message from './Message';

function MessageList({ messages, oldMessage }) {
  const ref = useRef(null);
  console.log(oldMessage)
  console.log(messages);
  if (oldMessage) {
    oldMessage.forEach(element => {
      console.log(element);
      // Your other operations with oldMessage
    });
  } else {
    console.log('oldMessage is undefined');
  }
  
  const mergedMessages = [...messages, ...oldMessage];
  console.log(mergedMessages)

  useEffect(() => {
    const messagelist = ref.current;
    messagelist.scrollTop = messagelist.scrollHeight;
  });

  return (
    <div ref={ref} className="columns is-multiline has-text-black has-background-white-bis messagelist" style={{ alignContent: 'flex-start' }}>
      {mergedMessages.map((message, index) => <Message key={index} data={message} />)}
    </div>
  );
}
export default MessageList;
