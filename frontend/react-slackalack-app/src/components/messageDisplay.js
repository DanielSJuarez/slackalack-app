function MessageDisplay({ text, username}) {

  return (
    <p>{text}
      <span> {username}</span>
    </p>
  );
}

export default MessageDisplay;