import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('87ad5acb75587302cd7a', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('message'); //订阅messahe
    channel.bind('inserted', function (newMessage) {
      // alert(JSON.stringify(data));
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages])
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
