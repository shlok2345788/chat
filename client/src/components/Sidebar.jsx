import React, { useState } from 'react';
import { Search, LogOut } from 'lucide-react';
import UserList from './UserList';

function Sidebar({ 
  currentUser, 
  onlineUsers, 
  selectedUser, 
  onSelectUser, 
  socketStatus, 
  onLogout 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const myInitials = currentUser ? currentUser.slice(0, 2).toUpperCase() : '?';

  return (
    <aside className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="my-profile">
          <div className="my-avatar" title={`Logged in as ${currentUser}`}>
            {myInitials}
          </div>
          <span className="my-name">{currentUser}</span>
        </div>

        <div className="header-tools">
          {/* Connection Status Badge */}
          <div className="status-indicator">
            <span className={`status-dot ${socketStatus}`}></span>
            <span>{socketStatus}</span>
          </div>

          {/* Logout Button */}
          <button 
            onClick={onLogout} 
            className="emoji-btn" 
            title="Log Out"
            style={{ padding: '4px' }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Search Container */}
      <div className="search-container">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search online users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users List */}
      <UserList
        onlineUsers={onlineUsers}
        currentUser={currentUser}
        selectedUser={selectedUser}
        onSelectUser={onSelectUser}
        searchQuery={searchQuery}
      />
    </aside>
  );
}

export default Sidebar;
