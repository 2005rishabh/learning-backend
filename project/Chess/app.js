// server.js
// Express + Socket.IO chess server

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const { Chess } = require("chess.js");
const chess = new Chess();

const path = require("path");

// players object to store sockets
let players = {};
let currentPlayer = "W";

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// home route
app.get("/", (req, res) => {
  res.render("index", { title: "Chess Game" });
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Naya user connected:", socket.id);

  // Assign role (white/black/spectator)
  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "W");
  } else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "B");
  } else {
    socket.emit("Spectator");
  }

  // Handle disconnect
  socket.on("disconnect", () => {
    if (players.white === socket.id) delete players.white;
    if (players.black === socket.id) delete players.black;
    console.log("User disconnected:", socket.id);
  });

  // Handle move event from client
  socket.on("move", (move) => {
    try {
      // White turn but black ne move kiya
      if (chess.turn() == "w" && players.white != socket.id) return;
      // Black turn but white ne move kiya
      if (chess.turn() == "b" && players.black != socket.id) return;

      const result = chess.move(move);
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move); // sabko broadcast karo
        io.emit("boardState", chess.fen());
      } else {
        console.log("Invalid Move:", move);
        socket.emit("invalidMove", move);
      }
    } catch (error) {
      console.log("Error in move:", error);
      socket.emit("error", error);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
});
