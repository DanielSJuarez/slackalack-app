import { useState } from 'react'

function EditDelete({ editMessage, setEditDeleteMessage, deleteMessage, editMessageDetails, editDeleteMessage, id, username }) {

    const dotEditDisplay = (
        <>
        <span className='username'>{username}
        <button name='addChannel' type='button' className='addChannel' onClick={() => setEditDeleteMessage(true)}>...</button>
        </span>
        </>
    )

    const editDeleteMessageStatus = (
        <>
            <span><div>
                <span className='username'>{username}</span>
                <span><input className='editInput' type='text' name='message' id='message' placeholder='edit message' onChange={editMessageDetails} /></span>
                <span><button className='edit statusButton' id={id} type='button' name='edit' onClick={editMessage}>edit</button></span>
                <span><button className='statusButton' id={id} type='button' name='delete' onClick={deleteMessage}>delete</button></span>
            </div></span>
        </>
    )

    return (
        <>
            {editDeleteMessage ? editDeleteMessageStatus : dotEditDisplay}
        </>
    );
}

export default EditDelete