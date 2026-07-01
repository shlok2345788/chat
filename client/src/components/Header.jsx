import React from 'react';
import { MessageSquare, Sun, Moon, Users, Volume2, VolumeX } from 'lucide-react';

function Header({ 
  username, 
  socketConnected, 
  socketStatus, // 'connected', 'connecting', 'disconnected'
  onlineCount, 
  darkMode, 
  toggleDarkMode,
  soundMuted,
  toggleSound
}) {
  
  // Get avatar abbreviation (first two characters of username)
  const getInitials = (name) => {
    if (!name) return '?';
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="header-bar">
      <div className="header-brand">
        <div className="header-logo">
          <MessageSquare size={20} />
        </div>
        <div className="header-title-container">
          <h2>BubbleChat</h2>
          <div className="header-meta">
            <span className="status-badge">
              <span className={`status-dot ${socketStatus}`}></span>
              {socketStatus === 'connected' ? 'connected' : socketStatus === 'connecting' ? 'connecting' : 'offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="header-actions">
        {/* Sound Notification Toggle */}
        <button 
          className="sound-toggle-btn" 
          onClick={toggleSound}
          title={soundMuted ? "Unmute Notifications" : "Mute Notifications"}
        >
          {soundMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Dark Mode Toggle */}
        <button 
          className="theme-toggle" 
          onClick={toggleDarkMode}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Online Count Badge */}
        <div className="online-counter" title="Users currently online">
          <Users size={16} />
          <span>{onlineCount} {onlineCount === 1 ? 'user' : 'users'}</span>
        </div>

        {/* Logged in User Profile Info */}
        {username && (
          <div className="user-info-badge">
            <div className="user-avatar" title={`Logged in as ${username}`}>
              {getInitials(username)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
