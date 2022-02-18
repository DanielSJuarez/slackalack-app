import { useState, useEffect } from 'react'
import ChannelDisplay from './components/channelDisplay';
import Login from './components/login';
import MessageDisplay from './components/messageDisplay';
import Register from './components/register';
import Cookies from 'js-cookie';

function App() {
  const [channelsView, setChannelsView] = useState(null)
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
    <ChannelDisplay key={channel.id} {...channelsView} />
  ));

  return (
    <>
      <nav>
        <button name='logOut' type='button' className='logOut' onClick={handleLogout}>Logout</button>
      </nav>
      <button name='addChannel' type='button' className='addChannel'>+</button>
      {channelList}
      <Login setAuth={setAuth} />
      <MessageDisplay />
      <Register setAuth={setAuth} />
    </>
  );
}

export default App;
