import React from 'react';

function Message({ message, currentUser }) {
  const { user, text, time, isSystem } = message;

  // Render system alert message
  if (isSystem) {
    return (
      <div className="message-wrapper system">
        <div className="system-msg-bubble">
          {text}
        </div>
      </div>
    );
  }

  const isSelf = user === currentUser;

  return (
    <div className={`message-wrapper ${isSelf ? 'self' : 'peer'}`}>
      <div className="message-meta">
        {!isSelf && <span className="message-sender">{user}</span>}
      </div>
      <div className="message-bubble">
        {text}
        <span className="message-time">{time}</span>
      </div>
    </div>
  );
}

export default Message;
