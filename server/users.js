// In-memory store of active users: socketId -> username
const activeUsers = new Map();

/**
 * Checks if a username is already taken by any active user.
 * @param {string} username 
 * @returns {boolean}
 */
const isUsernameTaken = (username) => {
  const sanitized = username.trim().toLowerCase();
  for (const name of activeUsers.values()) {
    if (name.toLowerCase() === sanitized) {
      return true;
    }
  }
  return false;
};

/**
 * Adds a new user to the active store.
 * @param {string} socketId 
 * @param {string} username 
 */
const addUser = (socketId, username) => {
  activeUsers.set(socketId, username.trim());
};

/**
 * Removes a user from the active store by socket ID.
 * @param {string} socketId 
 * @returns {string|null} The username of the removed user, if found.
 */
const removeUser = (socketId) => {
  const username = activeUsers.get(socketId);
  if (username) {
    activeUsers.delete(socketId);
    return username;
  }
  return null;
};

/**
 * Get username associated with a socket ID.
 * @param {string} socketId 
 * @returns {string|undefined}
 */
const getUser = (socketId) => {
  return activeUsers.get(socketId);
};

/**
 * Retrieves all online usernames.
 * @returns {string[]} Array of online usernames.
 */
const getAllUsers = () => {
  return Array.from(activeUsers.values());
};

module.exports = {
  isUsernameTaken,
  addUser,
  removeUser,
  getUser,
  getAllUsers
};
