import { useState, useEffect } from 'react'
import ChannelDisplay from './components/channelDisplay';
import Login from './components/login';
import MessageDisplay from './components/messageDisplay';
import Register from './components/register';
import Cookies from 'js-cookie';
import CreateChannel from './components/newChannel';
import MessageField from './components/messageField';


function App() {
  const [channelsView, setChannelsView] = useState(null);
  const [messageView, setMessageView] = useState([]);
  const [newMessage, setNewMessage] = useState('')
  const [newChannel, setNewChannel] = useState('')
  const [pkChannelState, setPkchannelState] = useState('')
  const [account, setAccount] = useState(true)
  const [addChannelDisplay, setAddChannelDisplay] = useState(false);
  const [messageField, setMessageField] = useState(false)
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
  const [state, setState] = useState({
    username: '',
    password: ''
  })
 
  const errorMessage = (err) => {
    console.log(err);
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
    setInterval(() => getChannels(), 10000)
  }, [])

  if (!channelsView) {
    return <div>Fetching channel data....</div>
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
      errorMessage
    )

    const data = await response.json();
    Cookies.remove('Authorization', `Token ${data.key}`);
    setAuth(false);
  }

  const addChannelName = (event) => {
    const channelName = event.target.value;
    setNewChannel(channelName)
  }

  const addChannel = async () => {
    if (newChannel.length < 1) {
      alert('No channel name added')
    }

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

    const response = await fetch('/api/v1/channels/', options).catch(errorMessage);

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    setChannelsView([...channelsView, { 'channel': newChannel }])
    setNewChannel('')
    setAddChannelDisplay(false)
  }

  const messageContent = (event) => {
    const messageDetails = event.target.value;
    setNewMessage(messageDetails)
  }

  const addMessage = async () => {
    if (newMessage.length < 1) {
      alert('No message added')
    }

    const message = {
      text: newMessage,
      channel: pkChannelState,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(message)
    }

    const response = await fetch(`/api/v1/channels/${pkChannelState}/messages/`, options).catch(errorMessage);

    if (!response.ok) {
      throw new Error('Network response was not OK');
    } 

    const data = await response.json();
    
    setMessageView([...messageView, data])
    setNewMessage('')
  }

  const channelList = channelsView.map(channel => (
    <ChannelDisplay key={channel.id} {...channel} setMessageView={setMessageView} setPkchannelState={setPkchannelState} pkChannelState={pkChannelState} setMessageField={setMessageField} />
  ));

  const messageList = messageView.map(message => (
    <MessageDisplay key={message.id} {...message} errorMessage={errorMessage} setMessageView={setMessageView} pkChannelState={pkChannelState} messageView={messageView} setMessageView={setMessageView}/>
  ));

  const homeScreen = (
    <>
      <nav className='nav'>
        <p className='mainTitle'>Slackalack
          <span className="dot-small"></span>
        </p>
      </nav>
      <button name='logOut' type='button' className='logOut' onClick={handleLogout}>Logout</button>
      <div className='row'>
        <div className='col-2 channelRow'>
          <CreateChannel addChannel={addChannel} setAddChannelDisplay={setAddChannelDisplay} addChannelName={addChannelName} newChannel={newChannel} addChannelDisplay={addChannelDisplay} />
          {channelList}
        </div>
        <div className='col-10 messageArea'>
          <div className='col messageSection'>
            {messageList}
            <MessageField messageField={messageField} addMessage={addMessage} newMessage={newMessage} messageContent={messageContent} />
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {auth ? homeScreen : account ? <Login setAuth={setAuth} setAccount={setAccount} /> : <Register setAuth={setAuth} setAccount={setAccount} />}
    </>
  );
}

export default App;
