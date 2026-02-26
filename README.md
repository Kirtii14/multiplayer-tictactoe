#  Multiplayer Tic Tac Toe (Real-Time)

A production-ready real-time multiplayer Tic Tac Toe game built with **React, TypeScript, Node.js, Express, and Socket.IO**, deployed publicly on Render.

>  Play with a friend in real time  
>  Or challenge the built-in bot  
>  Fully deployed full-stack application 
 
<p align="center">
  <img src="image.png" alt="Multiplayer Tic Tac Toe Preview" height="500"/>
</p>

---

##  Live Demo

Frontend:  
https://multiplayer-tictactoe-1.onrender.com  

Backend (WebSocket Server):  
https://multiplayer-tictactoe-j3gv.onrender.com  

> ⚠️ Note: Backend runs on Render free tier and may take ~30 seconds to wake up after inactivity.

---

##  Project Intention

I built this project to deeply understand:

- Real-time communication using WebSockets
- Multiplayer room architecture
- Game state synchronization
- Server-authoritative game logic
- Production deployment of full-stack applications

Rather than building a simple static game, I wanted to create a **real-time multiplayer experience** that works globally and handles:

- Room creation
- Game joining
- Turn validation
- Winner detection
- Bot gameplay
- Player disconnect handling

This project reflects my focus on writing structured, scalable, and production-ready code.

---

##  Features

###  Multiplayer Mode
- Create private game rooms
- Join using Game ID
- Real-time move synchronization
- Turn validation on server
- Automatic win/draw detection
- Room cleanup on disconnect

###  Play vs Computer
- Local bot mode
- Simulated thinking delay
- Winner & draw detection
- Turn-based logic enforcement

###  Interactive UI
- Comic-style UI
- Dynamic speech bubbles
- Character expressions (Win / Loss / Normal)
- Responsive design

---

##  Architecture

### Frontend
- React (TypeScript)
- Socket.IO Client
- Tailwind CSS
- Component-based UI architecture

### Backend
- Node.js
- Express
- Socket.IO
- Server-authoritative game engine
- UUID-based room system

### Real-Time Flow

1. Client connects via WebSocket
2. Server creates or joins room
3. Moves are validated server-side
4. Updated game state broadcast to room
5. Winner/draw calculated on server
6. Clients re-render based on state

This ensures:
- No client-side cheating
- Consistent state across players
- Clean separation of concerns

---

##  Game Logic

Win detection is handled using predefined winning patterns:

- Rows
- Columns
- Diagonals

Server validates:
- Turn order
- Cell availability
- Game status
- Winner detection
- Draw detection

This makes the backend authoritative and secure.

---

##  Tech Stack

Frontend:
- React
- TypeScript
- Tailwind CSS
- Socket.IO Client

Backend:
- Node.js
- Express
- Socket.IO
- TypeScript

Deployment:
- Render (Web Service + Static Site)

---

##  How To Run Locally

### Clone Repository
```bash
git clone https://github.com/Kirtii14/multiplayer-tictactoe.git
cd multiplayer-tictactoe
```

---

### Run Backend

```bash
cd server
npm install
npm run dev
```

Server runs on:
```
http://localhost:4000
```

---

### Run Frontend

```bash
cd client
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

##  What I Learned

- WebSocket-based real-time architecture
- State synchronization strategies
- Server-side game validation
- Multiplayer room management
- Deployment challenges & environment handling
- Handling free-tier infrastructure limitations

---

##  Future Improvements

- Smarter AI (Minimax algorithm)
- Match history persistence
- User authentication
- Reconnection recovery
- Score tracking
- Custom domain

---

## Contact

For issues, feedback, or collaboration:

Email: kirtit1444@gmail.com

X (Twitter): https://x.com/cosmicc1444

Feel free to star the repo or connect with me!

## License

This project is licensed under the MIT License.
