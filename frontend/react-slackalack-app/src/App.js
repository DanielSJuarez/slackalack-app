import {useState, useEffect} from 'react'
import ChannelDisplay from './components/channelDisplay';
import Login from './components/login';
import MessageDisplay from './components/messageDisplay';
import Register from './components/register';

function App() {
const [channelsView, setChannelView] = useState([])

const channelList = channelsView.map(channel => (
  <ChannelDisplay key={channel.id} {...channelsView}/>
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
