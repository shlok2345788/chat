import React, { useState, useEffect, useRef } from 'react';
import { Smile, Send, Users } from 'lucide-react';
import Message from './Message';
import { sendMessage, emitTyping } from '../services/socket';

const EMOJIS = ['😀', '😂', '👍', '❤️', '🔥', '🎉', '👏', '😮', '😢', '🙌', '✨', '👋'];

function ChatBox({ messages, currentUser, onlineUsers, typingUsers }) {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [localTyping, setLocalTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  // Handle click outside emoji picker to close it
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

    // Send via socket
    sendMessage(trimmed);
    
    // Reset local typing indicator
    if (localTyping) {
      emitTyping(false);
      setLocalTyping(false);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setInputText('');
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);

    // Typing indicator logic
    if (!localTyping) {
      setLocalTyping(true);
      emitTyping(true);
    }

    // Reset typing status after a brief delay of inactivity
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      emitTyping(false);
      setLocalTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    // Send message on Enter key without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addEmoji = (emoji) => {
    setInputText((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  // Format typing text for multiple users
  const getTypingText = () => {
    if (typingUsers.length === 0) return '';
    if (typingUsers.length === 1) return `${typingUsers[0]} is typing`;
    if (typingUsers.length === 2) return `${typingUsers[0]} and ${typingUsers[1]} are typing`;
    return `${typingUsers[0]}, ${typingUsers[1]} and ${typingUsers.length - 2} others are typing`;
  };

  return (
    <div className="chat-main-container">
      {/* Sidebar - Desktop only */}
      <aside className="users-sidebar">
        <div className="sidebar-title">
          <Users size={16} />
          <span>Active Users</span>
        </div>
        <ul className="users-list">
          {onlineUsers.map((user, idx) => {
            const isMe = user === currentUser;
            return (
              <li key={`${user}-${idx}`} className={`user-item ${isMe ? 'current-user' : ''}`}>
                <div className="user-item-avatar">
                  {user.slice(0, 2).toUpperCase()}
                </div>
                <span className="user-item-name">
                  {user} {isMe && '(You)'}
                </span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main Chat Stream */}
      <div className="chat-stream-area">
        {onlineUsers.length <= 1 && (
          <div className="testing-tip-banner">
            💡 <strong>Testing Tip:</strong> Open another browser tab or an Incognito window and join with a different name to test the real-time chat!
          </div>
        )}
        {/* Messages Stream */}
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="message-wrapper system" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <div className="system-msg-bubble">
                No messages yet. Send a message to start the conversation!
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <Message 
                key={msg.id} 
                message={msg} 
                currentUser={currentUser} 
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Typing Status Notification */}
        <div className="typing-status-indicator">
          {typingUsers.length > 0 && (
            <>
              <span>{getTypingText()}</span>
              <div className="typing-dots">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </>
          )}
        </div>

        {/* Input Panel */}
        <div className="input-panel">
          <form onSubmit={handleSend} className="input-panel-form">
            <div className="input-actions-container" ref={emojiPickerRef}>
              <button
                type="button"
                className="emoji-trigger-btn"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                title="Add emoji"
              >
                <Smile size={22} />
              </button>

              {/* Simple Emoji Picker Panel */}
              {showEmojiPicker && (
                <div className="emoji-popover">
                  {EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="emoji-option"
                      onClick={() => addEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <textarea
              ref={inputRef}
              className="chat-text-area"
              placeholder="Type a message..."
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />

            <button
              type="submit"
              className="send-message-btn"
              disabled={!inputText.trim()}
              title="Send Message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
