import React, { useState, useEffect, useRef } from 'react';
import { socket, registerUser, joinPrivateChat, sendPrivateMessage } from './services/socket';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('chat_username') || '';
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messagesByRoom, setMessagesByRoom] = useState({});
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginError, setLoginError] = useState('');

  const currentUserRef = useRef(currentUser);
  const selectedUserRef = useRef(selectedUser);

  // Keep references updated for async socket events
  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  useEffect(() => {
    selectedUserRef.current = selectedUser;
    
    // Automatically join the private room whenever a contact is selected
    if (currentUser && selectedUser) {
      const roomId = [currentUser, selectedUser].sort().join('_');
      joinPrivateChat(roomId);
    }
  }, [selectedUser, currentUser]);

  // Socket setup and listeners
  useEffect(() => {
    if (socket.connected) {
      setSocketStatus('connected');
      // Re-register if username exists in local storage
      if (currentUserRef.current) {
        registerUser(currentUserRef.current);
      }
    } else {
      setSocketStatus('connecting');
      socket.connect();
    }

    const handleConnect = () => {
      console.log('Socket connected');
      setSocketStatus('connected');
      // Auto-register upon connect/reconnect
      if (currentUserRef.current) {
        registerUser(currentUserRef.current);
      }
    };

    const handleDisconnect = () => {
      console.log('Socket disconnected');
      setSocketStatus('disconnected');
    };

    const handleConnectError = () => {
      setSocketStatus('connecting');
    };

    const handleLoginSuccess = (registeredName) => {
      console.log(`Successfully registered username: ${registeredName}`);
      setCurrentUser(registeredName);
      localStorage.setItem('chat_username', registeredName);
      setLoginError('');
      setIsRegistering(false);

      // Re-join private chat if user is selected
      if (selectedUserRef.current) {
        const roomId = [registeredName, selectedUserRef.current].sort().join('_');
        joinPrivateChat(roomId);
      }
    };

    const handleUsernameTaken = (errMsg) => {
      setLoginError(errMsg);
      setCurrentUser('');
      localStorage.removeItem('chat_username');
      setIsRegistering(false);
    };

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    const handleReceivePrivateMessage = (msg) => {
      console.log('Received private message:', msg);
      setMessagesByRoom((prev) => {
        const room = msg.roomId;
        const currentList = prev[room] || [];
        
        // Prevent duplicate messages by verifying IDs
        const exists = currentList.some(item => item.id === msg.id);
        if (exists) return prev;

        return {
          ...prev,
          [room]: [...currentList, msg]
        };
      });
    };

    const handleErrorMessage = (err) => {
      console.error('Server message error:', err);
    };

    // Subscriptions
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('login_success', handleLoginSuccess);
    socket.on('username_taken', handleUsernameTaken);
    socket.on('online_users', handleOnlineUsers);
    socket.on('receive_private_message', handleReceivePrivateMessage);
    socket.on('error_message', handleErrorMessage);

    // Cleanup
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('login_success', handleLoginSuccess);
      socket.off('username_taken', handleUsernameTaken);
      socket.off('online_users', handleOnlineUsers);
      socket.off('receive_private_message', handleReceivePrivateMessage);
      socket.off('error_message', handleErrorMessage);
    };
  }, []);

  const handleLogin = (username) => {
    setIsRegistering(true);
    setLoginError('');
    registerUser(username);
  };

  const handleLogout = () => {
    setCurrentUser('');
    setSelectedUser(null);
    localStorage.removeItem('chat_username');
    // Disconnect and reconnect socket to clean up server registry
    socket.disconnect();
    socket.connect();
  };

  const handleSendMessage = (text) => {
    if (!currentUser || !selectedUser) return;
    
    const roomId = [currentUser, selectedUser].sort().join('_');
    const timestamp = new Date().toISOString();

    const messagePayload = {
      sender: currentUser,
      receiver: selectedUser,
      text,
      timestamp,
      roomId
    };

    sendPrivateMessage(messagePayload);
  };

  // Get message list for the current room
  const getCurrentRoomMessages = () => {
    if (!currentUser || !selectedUser) return [];
    const roomId = [currentUser, selectedUser].sort().join('_');
    return messagesByRoom[roomId] || [];
  };

  // Mobile responsiveness helper
  const getMobileLayoutClass = () => {
    return selectedUser ? 'show-chat' : 'show-sidebar';
  };

  return (
    <div className="app-wrapper">
      {!currentUser ? (
        <Login 
          onLogin={handleLogin} 
          isConnecting={isRegistering} 
          loginError={loginError}
        />
      ) : (
        <div className={`chat-window ${getMobileLayoutClass()}`}>
          <Sidebar
            currentUser={currentUser}
            onlineUsers={onlineUsers}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
            socketStatus={socketStatus}
            onLogout={handleLogout}
          />
          <ChatWindow
            selectedUser={selectedUser}
            currentUser={currentUser}
            messages={getCurrentRoomMessages()}
            onSendMessage={handleSendMessage}
            onBack={() => setSelectedUser(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
