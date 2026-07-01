const formatTime = require('../utils/formatTime');

// Keep track of active users: socket.id -> username
const activeUsers = new Map();

// In-memory message history (stores last 100 messages)
const messageHistory = [];
const MAX_HISTORY = 100;

function chatSocket(io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // 1. Handle user joining
    socket.on('join_chat', (username) => {
      if (!username || typeof username !== 'string' || username.trim() === '') {
        return socket.emit('error_message', 'Invalid username.');
      }
      
      const sanitizedUsername = username.trim();
      
      // Store user information
      activeUsers.set(socket.id, sanitizedUsername);
      
      console.log(`${sanitizedUsername} (${socket.id}) joined the chat`);

      // Send message history to the newly joined user
      socket.emit('chat_history', messageHistory);

      // Broadcast system message to all clients
      const systemMessage = {
        id: `sys-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        user: 'System',
        text: `${sanitizedUsername} joined the chat`,
        time: formatTime(),
        isSystem: true
      };
      
      // Append system message to history
      saveToHistory(systemMessage);
      
      io.emit('receive_message', systemMessage);

      // Broadcast updated online users list/count
      updateOnlineUsers(io);
    });

    // 2. Handle sending messages
    socket.on('send_message', (messageText) => {
      const username = activeUsers.get(socket.id);
      
      if (!username) {
        return socket.emit('error_message', 'User not registered in session.');
      }

      if (!messageText || typeof messageText !== 'string' || messageText.trim() === '') {
        return socket.emit('error_message', 'Message content cannot be empty.');
      }

      const chatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        user: username,
        text: messageText.trim(),
        time: formatTime()
      };

      // Save to history
      saveToHistory(chatMessage);

      // Broadcast the message to all connected clients
      io.emit('receive_message', chatMessage);
    });

    // 3. Handle typing status (Bonus Feature)
    socket.on('typing_status', (isTyping) => {
      const username = activeUsers.get(socket.id);
      if (username) {
        // Broadcast typing status to everyone except the sender
        socket.broadcast.emit('user_typing', {
          username,
          isTyping
        });
      }
    });

    // 4. Handle disconnection
    socket.on('disconnect', () => {
      const username = activeUsers.get(socket.id);
      
      if (username) {
        console.log(`${username} disconnected`);
        activeUsers.delete(socket.id);

        // Broadcast system message about departure
        const systemMessage = {
          id: `sys-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          user: 'System',
          text: `${username} left the chat`,
          time: formatTime(),
          isSystem: true
        };
        
        // Append system message to history
        saveToHistory(systemMessage);
        
        io.emit('receive_message', systemMessage);

        // Clear typing status of this user just in case
        socket.broadcast.emit('user_typing', {
          username,
          isTyping: false
        });

        // Broadcast updated online users list/count
        updateOnlineUsers(io);
      } else {
        console.log(`Anonymous user disconnected: ${socket.id}`);
      }
    });
  });
}

/**
 * Saves a message to the in-memory array, capping it at MAX_HISTORY
 */
function saveToHistory(message) {
  messageHistory.push(message);
  if (messageHistory.length > MAX_HISTORY) {
    messageHistory.shift();
  }
}

/**
 * Helper to emit updated online user list and count to all clients
 */
function updateOnlineUsers(io) {
  const usersList = Array.from(activeUsers.values());
  io.emit('online_users', {
    count: usersList.length,
    users: usersList
  });
}

module.exports = chatSocket;
