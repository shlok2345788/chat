import React from 'react';

function UserList({ onlineUsers, currentUser, selectedUser, onSelectUser, searchQuery }) {
  
  // Filter out the current user and check search query
  const filteredUsers = onlineUsers.filter(user => {
    const isMe = user.toLowerCase() === currentUser.toLowerCase();
    const matchesSearch = user.toLowerCase().includes(searchQuery.toLowerCase());
    return !isMe && matchesSearch;
  });

  if (filteredUsers.length === 0) {
    return (
      <div className="no-users-notice">
        {searchQuery ? 'No matching users found.' : 'No other users are online right now.'}
      </div>
    );
  }

  return (
    <ul className="user-list-wrapper">
      {filteredUsers.map((username) => {
        const isActive = selectedUser === username;
        const initials = username.slice(0, 2).toUpperCase();

        return (
          <li
            key={username}
            className={`user-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelectUser(username)}
          >
            <div className="user-avatar">
              {initials}
              <span className="online-pulse"></span>
            </div>
            
            <div className="user-info">
              <div className="user-name-row">
                <span className="contact-name">{username}</span>
              </div>
              <p className="last-msg-text">Click to chat privately</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default UserList;
