import {useState} from 'react'

function CreateChannel({addChannel, newChannel, addChannelName, setAddChannelDisplay, addChannelDisplay}) {

    

    const plusChannelDisplay = (
        <button name='addChannel' type='button' className='addChannel' onClick={() => setAddChannelDisplay(true)}>+</button>
    )

    const newChannelDisplay = (
        <>
            <input type='text' name='channel' id='channel' placeholder='channel' className='field' value={newChannel} onChange={addChannelName} />
            <button name='addChannel' type='button' className='submit' onClick={addChannel}>Submit</button>
        </>
    )

    return (
        <>
            {addChannelDisplay ? newChannelDisplay : plusChannelDisplay}
        </>
    );
}

export default CreateChannel