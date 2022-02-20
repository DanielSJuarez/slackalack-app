import Cookies from 'js-cookie';
import{ useState} from 'react'

function MessageDisplay({id,  text, username, errorMessage , pkChannelState}) {
  const [updatedMesssage, setUpdatedMessage] = useState('')

  const editMessageDetails = (event) => { 
    const updatedEdits = event.target.value;
    setUpdatedMessage(updatedEdits) 
  }

  const editMessage = async () => {
    const newUpdatedMessage = {
      text: updatedMesssage, 
      channel: pkChannelState,
    }
    const options = {
      method: 'PUT', 
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(newUpdatedMessage) 
    }

    const response = await fetch(`/api/v1/channels/${pkChannelState}/messages/${id}/`, options).catch(errorMessage);

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

    const response = await fetch(`/api/v1/channels/${pkChannelState}/messages/${id}/`, options).catch(errorMessage);

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
  }


  return (
    <p className='message'>{text}
      <span> {username}</span>
      <span><input type='text' name='message' id='message' placeholder='message' onChange={editMessageDetails}/></span>
      <span><button id={id} type='button' name='edit' onClick={editMessage}>edit</button></span>
      <span><button id={id} type='button' name='delete' onClick={deleteMessage}>delete</button></span>
    </p>
  );
}

export default MessageDisplay;