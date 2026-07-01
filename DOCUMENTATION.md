# PROJECT SUBMISSION REPORT

## Project Title: BubbleChat - Real-Time Private 1-to-1 Chat Application

---

## 🔗 Project Links

*   **GitHub Repository**: [https://github.com/shlok2345788/chat.git](https://github.com/shlok2345788/chat.git)
*   **Live Web Deployment**: [https://chat-hd3wm9cln-shlok2345788s-projects.vercel.app/](https://chat-hd3wm9cln-shlok2345788s-projects.vercel.app/)

---

## 📝 Executive Summary

BubbleChat is a production-ready, mobile-responsive, private 1-to-1 direct messaging (DM) application modeled after modern communication platforms like WhatsApp and Instagram DMs. Unlike generic global chat rooms, BubbleChat uses a peer-paired room routing architecture, ensuring that messages are strictly transmitted between the two selected users and are invisible to other active sockets.

The project is divided into an independent **React.js + Vite** client and a **Node.js + Socket.io** backend server, making it fully modular and ready to deploy on cloud platforms (Vercel and Render/Railway).

---

## 🎯 Key Features

1.  **Unique Username Registration**: Simple secure signup that verifies username availability across the server in real-time, preventing collision.
2.  **Contact Directory Sidebar**: Lists all active online users. Includes a real-time search field to filter contacts.
3.  **Deterministic Room Allocation**: Generates isolated Socket.io rooms dynamically by sorting user pairs (e.g., `[alex, shlok].sort().join('_') -> alex_shlok`), ensuring correct room handshakes.
4.  **1-to-1 Isolated Message Streams**: Emits messages strictly to targeted rooms using `io.to(roomId)`. No global broadcasts are used, securing conversation privacy.
5.  **WhatsApp-Inspired Interface**: Premium green/white light theme with responsive message bubble alignments (outgoing messages are green and aligned right, incoming are white and aligned left).
6.  **Web Audio Notification Engine**: Synthesizes custom double-beep chiming sounds locally via the browser's Web Audio API upon receiving incoming messages (zero network latency, requires no `.mp3` downloads).
7.  **Auto-Scroll & Responsive Layout**: Automatically scrolls to the newest message. The layout shifts dynamically to full-screen chat with a header back arrow (`←`) on mobile device displays (<768px).

---

## 🛠️ Tech Stack

### Frontend (Client)
*   **React.js (Vite)**: Component-based SPA construction.
*   **Socket.io-Client**: Full-duplex WebSocket connection and message subscription.
*   **Plain CSS3**: Styling tokens (CSS Variables) and custom animations.
*   **Lucide React**: Clean SVG line iconography.

### Backend (Server)
*   **Node.js & Express**: API and HTTP server configuration.
*   **Socket.io**: Real-time room binding and event-driven communication.
*   **CORS & Dotenv**: Environment variables management and cross-origin security.

---

## 📐 System Architecture

### User Communication flow:
```
[User A (alex)]                             [User B (shlok)]
      |                                           |
      |-- 1. Emits 'register_user'                |-- 1. Emits 'register_user'
      |   (Username: "alex")                      |   (Username: "shlok")
      v                                           v
[====================== Node.js Socket.io Server ======================]
      |                                           |
      |-- 2. Emits 'login_success'                |-- 2. Emits 'login_success'
      |   and broadcasts 'online_users' to both   |
      v                                           v
[User A selects User B]                     [User B selects User A]
      |                                           |
      |-- 3. Emits 'join_private_chat'            |-- 3. Emits 'join_private_chat'
      |   (Room: "alex_shlok")                    |   (Room: "alex_shlok")
      v                                           v
[====================== Joined Room "alex_shlok" ======================]
      |                                           |
      |-- 4. Emits 'private_message' ------------>|-- 5. Receives message in
      |      to Room "alex_shlok"                 |      real time
```

---

## 🗃️ Folder Structure

```
chat/
├── client/                     # Frontend client React code
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx     # Side menu holding contacts search
│   │   │   ├── UserList.jsx    # Displays individual user avatars
│   │   │   ├── ChatWindow.jsx  # Primary message box and inputs
│   │   │   ├── MessageBubble.jsx # Private chat bubble with timestamp
│   │   │   └── Login.jsx       # Login card with alphanumeric validation
│   │   ├── services/
│   │   │   └── socket.js       # Socket connector with event buffering
│   │   ├── styles/
│   │   │   └── app.css         # WhatsApp light green theme variables
│   │   ├── App.jsx             # Main state coordinator
│   │   └── main.jsx            # Mounting entrypoint
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json             # Single Page Application fallback routes
│
├── server/                     # Backend Node.js server
│   ├── socket/
│   │   └── privateChat.js      # Socket room allocation and emit loops
│   ├── server.js               # Entry server runner
│   ├── users.js                # In-memory registry of online socket handles
│   └── package.json
│
└── DOCUMENTATION.md            # Project submission document
```

---

## 🚀 How to Run Locally

### 1. Run the Server
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the node server:
   ```bash
   node server.js
   ```
   *The server runs on `http://localhost:5000`.*

### 2. Run the Client
1. Open a new terminal tab and navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The client runs on `http://localhost:5173`.*

---

## 🌍 Production Deployment Configurations

### Frontend (Vercel)
*   **Root Directory Settings**: Set to `client` to build the sub-folder correctly.
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Framework Preset**: `Vite`
*   **Environment Variable**: `VITE_API_URL` set to the live backend server URL (e.g. `https://my-chat-server.onrender.com`).

### Backend (Render / Railway / VPS)
*   **Option 1: Root Directory Deployment (Recommended & Automatic)**:
    *   **Root Directory Settings**: Keep as default (root of repository).
    *   **Build Command**: `yarn` or `npm install`
    *   **Start Command**: `node server.js`
*   **Option 2: Sub-folder Deployment**:
    *   **Root Directory Settings**: Set to `server`.
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
*   **Environment Variables**: Auto-injects `PORT` dynamically.
