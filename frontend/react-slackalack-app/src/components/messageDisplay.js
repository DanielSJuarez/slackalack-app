function MessageDisplay({ text, username}) {


  

  return (
    <p>{text}
      <span> {username}</span>
      <span><button>edit</button></span>
      <span><button>delete</button></span>
    </p>
  );
}

export default MessageDisplay;