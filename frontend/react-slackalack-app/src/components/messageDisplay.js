import Cookies from 'js-cookie';
import{ useState} from 'react'

function MessageDisplay({ text, username, errorMessage}) {
  const [updatedMesssage, setUpdatedMessage] = useState('')

  const editMessageDetails = (event) => { 
    const updatedEdits = event.target.value;
    setUpdatedMessage(updatedEdits) 
  }

  const editMessage = async () => {
    const newUpdatedMessage = {
      text: updatedMesssage, 
      channel: 1,
    }
    const options = {
      method: 'PUT', 
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(newUpdatedMessage) 
    }

    const response = await fetch('/api/v1/channels/1/messages/3/', options).catch(errorMessage);

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    setUpdatedMessage('')
  }


  const deleteMessage = async () => {
  
    const options = {
      method: 'DELETE', 
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
    }

    const response = await fetch('/api/v1/channels/1/messages/2/', options).catch(errorMessage);

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
  }


  return (
    <p>{text}
      <span> {username}</span>
      <span><input type='text' name='channel' id='channel' placeholder='channel' onChange={editMessageDetails}/></span>
      <span><button type='button' name='edit' onClick={editMessage}>edit</button></span>
      <span><button type='button' name='delete' onClick={deleteMessage}>delete</button></span>
    </p>
  );
}

export default MessageDisplay;