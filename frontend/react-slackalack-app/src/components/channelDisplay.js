import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
function ChannelDisplay({ id, channel, errorMessage, setMessageView, setPkchannelState, setMessageField, pkChannelState}) {
  const [channelClicked, setChannelClick] = useState(false)

  const viewChannelMessages = () => {

    setPkchannelState('')
    setPkchannelState(id)
    setMessageField(true)
    setChannelClick(true)
  }

  useEffect(() => {
    if (channelClicked) {
      const getMessages = async () => {
        const response = await fetch(`/api/v1/channels/${pkChannelState}/messages/`).catch(errorMessage);

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
  },[channelClicked])

  return (
    <div className='col'>
      <button id={id} className='channelButton' type='button' onClick={viewChannelMessages}># {channel}</button>
    </div>
  );
}

export default ChannelDisplay;