import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Smile, Send, MessageSquare } from 'lucide-react';
import MessageBubble from './MessageBubble';

const EMOJIS = ['😀', '😂', '👍', '❤️', '🔥', '🎉', '👏', '😮', '😢', '🙌', '✨', '👋'];

function ChatWindow({ 
  selectedUser, 
  currentUser, 
  messages, 
  onSendMessage, 
  onBack 
}) {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle click outside emoji picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    onSendMessage(trimmed);
    setInputText('');
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectEmoji = (emoji) => {
    setInputText(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  // If no chat is selected, show empty screen state
  if (!selectedUser) {
    return (
      <div className="chat-placeholder">
        <div className="placeholder-illustration">
          <MessageSquare size={80} strokeWidth={1} />
        </div>
        <h2>Select a User</h2>
        <p>Choose an online user from the sidebar directory to initiate a private, 1-to-1 conversation securely.</p>
      </div>
    );
  }

  const initials = selectedUser.slice(0, 2).toUpperCase();

  return (
    <div className="chat-window-panel">
      {/* Chat Window Header */}
      <header className="chat-header">
        <div className="selected-user-details">
          {/* Mobile Back Button */}
          <button className="back-btn" onClick={onBack} title="Back to user list">
            <ArrowLeft size={20} />
          </button>
          
          <div className="chat-user-avatar">
            {initials}
          </div>
          
          <div className="chat-user-info">
            <h3>{selectedUser}</h3>
            <span className="chat-user-status">online</span>
          </div>
        </div>
      </header>

      {/* Messages Stream */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="no-users-notice" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            No messages yet. Send a greeting to start your private conversation with {selectedUser}!
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              currentUser={currentUser} 
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Panel */}
      <div className="chat-input-panel">
        <div ref={emojiPickerRef} className="emoji-btn">
          <button 
            type="button" 
            className="emoji-btn"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Add emoji"
          >
            <Smile size={22} />
          </button>
          
          {showEmojiPicker && (
            <div className="emoji-picker-popover">
              {EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  className="emoji-item"
                  onClick={() => selectEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="chat-input-form">
          <input
            ref={inputRef}
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <button 
            type="submit" 
            className="send-btn"
            disabled={!inputText.trim()}
            title="Send message"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;
