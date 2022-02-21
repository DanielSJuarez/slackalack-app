import { useState } from 'react'

function MessageField({ messageField, addMessage, newMessage, messageContent}) {

    const dotPlaceholder = (
        <div><span className="bigDot"></span></div>
    )

    const newMessageField = (
        <>
            <input type='text' name='message' id='message' placeholder='message' className='field messageInput' value={newMessage} onChange={messageContent} />
            <button type='button' className='submit' onClick={addMessage}>Send</button>
        </>
    )

    return (
        <>
            {messageField ? newMessageField : dotPlaceholder}
        </>
    );
}

export default MessageField