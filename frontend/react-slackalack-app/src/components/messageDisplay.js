import Cookies from 'js-cookie';
import { useState } from 'react'
import EditDelete from './editDelete';

function MessageDisplay({ id, text, username, errorMessage, pkChannelState }) {
  const [updatedMesssage, setUpdatedMessage] = useState('')
  const [editDeleteMessage, setEditDeleteMessage] = useState(false);


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
    setEditDeleteMessage(false)
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
      <EditDelete editMessage={editMessage} setEditDeleteMessage={setEditDeleteMessage} deleteMessage={deleteMessage} editMessageDetails={editMessageDetails} editDeleteMessage={editDeleteMessage} />
    </p>
  );
}

export default MessageDisplay;