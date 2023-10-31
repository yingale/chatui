function ChatHeader({ title }) {
  return (
    <header className="columns is-mobile">
  <div className="column">
    <h1 className="is-size-5-tablet has-text-centered">{title}</h1>
    <p>Click on user or group to chat</p>
    <button className="button is-primary" style={{float:"right"}}>+ Group</button>
  </div>
  <div className="column is-2-mobile is-hidden-tablet has-text-right">
    <i className="fas fa-bars"></i>
  </div>
</header>

  );
}

export default ChatHeader;
