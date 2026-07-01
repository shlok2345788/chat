import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log(`Connecting socket to: ${SOCKET_URL}`);

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 20,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000
});

/**
 * Register user in the server's online users registry.
 * @param {string} username 
 */
export const registerUser = (username) => {
  socket.emit('register_user', username);
};

/**
 * Join a private room between two users.
 * @param {string} roomId 
 */
export const joinPrivateChat = (roomId) => {
  socket.emit('join_private_chat', roomId);
};

/**
 * Send a private 1-to-1 message to a specific room.
 * @param {object} messageData - { sender, receiver, text, roomId, timestamp }
 */
export const sendPrivateMessage = (messageData) => {
  socket.emit('private_message', messageData);
};
