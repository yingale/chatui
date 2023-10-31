import { useRef } from 'react';
import { useMessagesDispatch } from '../contexts/MessagesContext';
import socket from '../Socket';
import {postMessageData} from '../Integration'

function MessageForm({ fullName, senderId, receiverId, type }) {
  const textareaRef = useRef(null);
  const dispatch = useMessagesDispatch();

  const checkSubmit = (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    let textarea = textareaRef.current;

    socket.emit('send message', {
      user: fullName,
      text: textarea.value
    });

    dispatch({
      type: 'newmessage',
      message: {
        type: 'primary',
        user: fullName,
        text: textarea.value
      }
    });
    let groupId = 0
    if(type==="group") {
      groupId = parseInt(receiverId)
    }
    let messageData = {
      senderId: senderId,
      receiverId: parseInt(receiverId),
      content: textarea.value,
      groupId: groupId
    }
    postMessageData(messageData)
    textarea.value = '';
  }


  return (
    <>
      <div className="column is-paddingless">
        <textarea ref={textareaRef} autoFocus={true} className="textarea is-shadowless" rows="2" placeholder="Type a message" onKeyDown={checkSubmit}></textarea>
      </div>

      <div className="column is-2-mobile is-1-tablet is-paddingless">
      <button className="button is-medium is-paddingless is-white" onClick={handleSubmit}>
            <i className="far fa-paper-plane"></i>
          </button>
      </div>

    </>
  );
}

export default MessageForm;
