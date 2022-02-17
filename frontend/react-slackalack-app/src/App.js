import { useState, useEffect } from 'react'
import ChannelDisplay from './components/channelDisplay';
import Login from './components/login';
import MessageDisplay from './components/messageDisplay';
import Register from './components/register';

function App() {
  const [channelsView, setChannelsView] = useState(null)

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

  const channelList = channelsView.map(channel => (
    <ChannelDisplay key={channel.id} {...channelsView} />
  ));

  return (
    <>
      {channelList}
      <Login />
      <MessageDisplay />
      <Register />
    </>
  );
}

export default App;
