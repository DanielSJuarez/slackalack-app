import { useState} from 'react';
import Cookies from 'js-cookie'
function ChannelDisplay({id, channel, errorMessage, setMessageView, setPkchannelState}) {
  const [channelClicked, setChannelClick] = useState(false)

  const viewChannelMessages = async () => {
    setPkchannelState(id)
    const options = {
      method: 'GET', 
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
    }

    const response = await fetch(`/api/v1/channels/${id}/messages/`, options).catch(errorMessage);

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    
    const data = await response.json();
    setMessageView(data)
    setChannelClick(true)
    
  }

  if (channelClicked == true) {
    setInterval(() => viewChannelMessages, 10000)

  }

  return (
    <button id={id} className='channelButton' type='button' onClick={viewChannelMessages}># {channel}</button>
  );
}

export default ChannelDisplay;