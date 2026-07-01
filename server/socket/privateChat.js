const { 
  isUsernameTaken, 
  addUser, 
  removeUser, 
  getUser, 
  getAllUsers 
} = require('../users');

function privateChat(io) {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // 1. Register User (Login check)
    socket.on('register_user', (username) => {
      if (!username || typeof username !== 'string' || username.trim() === '') {
        return socket.emit('error_message', 'Invalid username.');
      }

      const trimmedName = username.trim();

      // Check if username is already taken by an active connection
      if (isUsernameTaken(trimmedName)) {
        console.log(`Registration rejected: "${trimmedName}" is already taken.`);
        return socket.emit('username_taken', 'Username is already taken.');
      }

      // Add to store
      addUser(socket.id, trimmedName);
      console.log(`User registered: "${trimmedName}" with socket ID: ${socket.id}`);

      // Confirm success
      socket.emit('login_success', trimmedName);

      // Broadcast list of all online users to everyone
      io.emit('online_users', getAllUsers());
    });

    // 2. Join Private Chat Room
    socket.on('join_private_chat', (roomId) => {
      if (!roomId) return;
      
      // Join the unique room for these two users
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined private room: ${roomId}`);
    });

    // 3. Handle Private Message
    socket.on('private_message', (messageData) => {
      const { sender, receiver, text, timestamp, roomId } = messageData;

      if (!roomId || !text || text.trim() === '') return;

      // Ensure sender is registered
      const activeName = getUser(socket.id);
      if (!activeName || activeName !== sender) {
        return socket.emit('error_message', 'Authentication mismatch.');
      }

      const formattedMessage = {
        sender,
        receiver,
        text: text.trim(),
        timestamp: timestamp || new Date().toISOString(),
        roomId,
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
      };

      // Broadcast ONLY inside the room containing the two users
      io.to(roomId).emit('receive_private_message', formattedMessage);
      console.log(`Message from ${sender} to ${receiver} in room ${roomId}`);
    });

    // 4. Handle Disconnection
    socket.on('disconnect', () => {
      const username = removeUser(socket.id);
      if (username) {
        console.log(`User disconnected: "${username}" (Socket ID: ${socket.id})`);
        
        // Broadcast updated online users list to everyone
        io.emit('online_users', getAllUsers());
      } else {
        console.log(`Anonymous socket disconnected: ${socket.id}`);
      }
    });
  });
}

module.exports = privateChat;
