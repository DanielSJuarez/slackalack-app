import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
function ChannelDisplay({ id, channel, errorMessage, setMessageView, setPkchannelState }) {
  const [channelClicked, setChannelClick] = useState(false)

  const viewChannelMessages = () => {
    setChannelClick(true)
  }

  useEffect(() => {
      setPkchannelState(id)
      if (channelClicked) {
        const getMessages = async () => {
        const response = await fetch(`/api/v1/channels/${id}/messages/`).catch(errorMessage);

        if (!response.ok) {
          throw new Error('Netword response was not OK!')
        } else {

          const data = await response.json();
          setMessageView(data)
        }
      }
      getMessages();
      setInterval(() => getMessages(), 10000)
    }
  }, [channelClicked])

  return (
    <button id={id} className='channelButton' type='button' onClick={viewChannelMessages}># {channel}</button>
  );
}

export default ChannelDisplay;