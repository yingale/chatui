import ChatFooter from './components/ChatFooter';
import ChatHeader from './components/ChatHeader';
import ChatMain from './components/ChatMain';
import { MessagesProvider } from './contexts/MessagesContext';
import { useParams } from 'react-router-dom';
import './styles/App.css';
function App({disabled}) {
  const { type, receiver,receiverId } = useParams();
  return (
    <MessagesProvider>
      <div className="hero is-fullheight has-text-white is-unselectable is-size-6">
        <div className="hero-body">
          <div className="container">
            <ChatHeader title="Chat" />
            <ChatMain receiver={receiver} receiverId={receiverId} type={type} disabled={disabled} />
            <ChatFooter />
          </div>
        </div>
      </div>
    </MessagesProvider>
  );
}

export default App;
