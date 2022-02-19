import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
function ChannelDisplay({ channel, errorMessage, setMessageView}) {

  const viewChannelMessages = async () => {
  
    const options = {
      method: 'GET', 
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
    }

    const response = await fetch('/api/v1/channels/1/messages/', options).catch(errorMessage);

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    
    const data = await response.json();
    setMessageView(data)
  }

  return (
    <button className='channelButton' type='button' onClick={viewChannelMessages}># {channel}</button>
  );
}

export default ChannelDisplay;