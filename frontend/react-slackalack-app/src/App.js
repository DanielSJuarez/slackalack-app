import { useState, useEffect } from 'react'
import ChannelDisplay from './components/channelDisplay';
import Login from './components/login';
import MessageDisplay from './components/messageDisplay';
import Register from './components/register';
import Cookies from 'js-cookie';

function App() {
  const [channelsView, setChannelsView] = useState(null);
  const [messageView, setMessageView] = useState([]);
  const [newMessage, setNewMessage] = useState('')
  const [newChannel, setNewChannel] = useState('')
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
  const [state, setState] = useState({
    username: '',
    password: ''
  })

  const errorMessage = (err) => {
    console.warn(err);
  }

  useEffect(() => {
    const getChannels = async () => {
      const response = await fetch('/api/v1/channels/').catch(errorMessage);

      if (!response.ok) {
        throw new Error('Netword response was not OK!')
      } else {

        const data = await response.json();
        setChannelsView(data);
      }
    }
    getChannels();
  }, [])

  if (!channelsView) {
    return <div>Fetching channel data....</div>
  }

  const handleError = (err) => {
    console.log(err);
  }

  const handleLogout = async event => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    }

    const response = await fetch('/rest-auth/logout/', options).catch(
      handleError
    )

    const data = await response.json();
    Cookies.remove('Authorization', `Token ${data.key}`);
    setAuth(false);
  }

  const channelList = channelsView.map(channel => (
    <ChannelDisplay key={channel.id} {...channel} setMessageView={setMessageView} />
  ));

  const messageList = messageView.map(message => (
    <MessageDisplay key={message.id} {...message} />
  ));


  const addChannelName = (event) => { 
    const channelName = event.target.value;
    setNewChannel(channelName) 
  }

  const addChannel = async () => {
    const message = {
      channel: newChannel,  
    }
    const options = {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(message) 
    }

    const response = await fetch('/api/v1/channels/', options).catch(handleError);

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    setNewMessage('')
  }


  const messageContent = (event) => { 
    const messageDetails = event.target.value;
    setNewMessage(messageDetails) 
  }

  const addMessage = async () => {
    const message = {
      text: newMessage, 
      channel: 1,
    }
    const options = {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(message) 
    }

    const response = await fetch('/api/v1/channels/1/messages/', options).catch(handleError);

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    setNewMessage('')
  }

  return (
    <>
      <nav>
        <button name='logOut' type='button' className='logOut' onClick={handleLogout}>Logout</button>
      </nav>
      <Login setAuth={setAuth} />
      <Register setAuth={setAuth} />
      <input type='text' name='channel' id='channel' placeholder='channel' onChange={addChannelName}/>
      <button name='addChannel' type='button' className='addChannel' onClick={addChannel}>+</button>
      {channelList}
      {messageList}
      <input type='text' name='message' id='message' placeholder='message' onChange={messageContent}/>
      <button type='button' onClick={addMessage}>Send</button>

    </>
  );
}

export default App;
