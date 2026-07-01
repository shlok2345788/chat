// server.js at the root of the repository to bootstrap the server subdirectory
const path = require('path');

// Configure dotenv to point to the server directory's .env file
require('dotenv').config({ path: path.join(__dirname, 'server', '.env') });

// Start the actual server
require('./server/server.js');
