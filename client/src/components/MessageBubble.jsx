import React from 'react';

function MessageBubble({ message, currentUser }) {
  const { sender, text, timestamp } = message;
  const isSelf = sender.toLowerCase() === currentUser.toLowerCase();

  // Helper to format ISO string to localized time string: HH:MM AM/PM
  const formatTime = (timeString) => {
    if (!timeString) return '';
    try {
      const date = new Date(timeString);
      if (isNaN(date.getTime())) return '';
      
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12; // '0' should be '12'
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      
      return `${hours}:${minutesStr} ${ampm}`;
    } catch (err) {
      return '';
    }
  };

  return (
    <div className={`message-bubble-wrapper ${isSelf ? 'self' : 'peer'}`}>
      <div className="bubble">
        <p className="bubble-text">{text}</p>
        <div className="bubble-time-row">
          <span className="bubble-time">{formatTime(timestamp)}</span>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
