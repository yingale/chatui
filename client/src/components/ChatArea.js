import { useEffect, useState } from 'react';
import { useMessages, useMessagesDispatch } from '../contexts/MessagesContext';
import socket from '../Socket';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { fetchMessage, fetchMessageGroup } from '../Integration';

function ChatArea({ receiver, receiverId, type }) {
  const messages = useMessages();
  const dispatch = useMessagesDispatch();
  const [oldMessage, setOldMessage] = useState([]); // Initialize with an empty array
  const userDetails = JSON.parse(localStorage.getItem('userdata'));
  const username = userDetails.username;
  const senderId = userDetails.uid;

  useEffect(() => {
    function onNewUser(newUser) {
      dispatch({
        type: 'newmessage',
        message: {
          type: 'information',
          user: newUser,
          text: 'logged in.'
        }
      });
    }

    function onExitUser(exitUser) {
      dispatch({
        type: 'newmessage',
        message: {
          type: 'information',
          user: exitUser,
          text: 'left.'
        }
      });
    }

    function onNewMessage(message) {
      dispatch({
        type: 'newmessage',
        message: {
          type: 'secondary',
          user: message.user,
          text: message.text
        }
      });
    }

    socket.on('new user', onNewUser);
    socket.on('exit user', onExitUser);
    socket.on('new message', onNewMessage);

    return () => {
      socket.off('new user', onNewUser);
      socket.off('exit user', onExitUser);
      socket.off('new message', onNewMessage);
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      let oldData =[]
      try {
        if(type==="group") {
          oldData = await fetchMessageGroup(receiverId);

        } else {
          oldData = await fetchMessage(senderId, receiverId);
        }
        setOldMessage(oldData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    fetchData();

  }, [senderId, receiverId]);

  return (
    <section className="column">
      <MessageList messages={messages} oldMessage={oldMessage} />
      <div className="columns is-mobile has-background-white is-paddingless has-text-centered messageform">
        <MessageForm fullName={username} senderId={senderId} receiverId={receiverId} type={type} />
      </div>
    </section>
  );
}

export default ChatArea;
