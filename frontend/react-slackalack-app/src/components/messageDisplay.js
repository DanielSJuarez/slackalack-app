import Cookies from 'js-cookie';
import{ useState} from 'react'

function MessageDisplay({id,  text, username, errorMessage , pkChannel}) {
  const [updatedMesssage, setUpdatedMessage] = useState('')

  const editMessageDetails = (event) => { 
    const updatedEdits = event.target.value;
    setUpdatedMessage(updatedEdits) 
  }

  const editMessage = async () => {
    const newUpdatedMessage = {
      text: updatedMesssage, 
      channel: pkChannel,
    }
    const options = {
      method: 'PUT', 
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(newUpdatedMessage) 
    }

    const response = await fetch(`/api/v1/channels/${pkChannel}/messages/${id}/`, options).catch(errorMessage);

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

    const response = await fetch(`/api/v1/channels/${pkChannel}/messages/${id}/`, options).catch(errorMessage);

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
  }


  return (
    <p>{text}
      <span> {username}</span>
      <span><input type='text' name='channel' id='channel' placeholder='channel' onChange={editMessageDetails}/></span>
      <span><button id={id} type='button' name='edit' onClick={editMessage}>edit</button></span>
      <span><button id={id} type='button' name='delete' onClick={deleteMessage}>delete</button></span>
    </p>
  );
}

export default MessageDisplay;