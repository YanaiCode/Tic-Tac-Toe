const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// const { createServer } = require('node:http');

const SessionManager = require("./SessionManager.js")
const SessManager = new SessionManager()

const hostname = '127.0.0.1';
const port = 3000;
const { Server } = require('socket.io');
const io = new Server(server)

const crypto = require('crypto');

app.get('/', (req, res) => {
  let id = crypto.randomUUID();
  res.redirect('/game/' +id);
});

app.use('/game', express.static(__dirname + '/public'))

app.get('/game/:id', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});
io.on('connection', (socket) => {
  // socket.join(roomID);
  socket.on("join room", async (roomID, socketXID, socketOID) => {
    console.log("working")
    for (let room of socket.rooms) {
      socket.leave(room)  //whenever someone joins they auto-join room, this disconnects
    }
    socket.join(roomID)
    let sockets = await io.in(roomID).fetchSockets();
    let sess = SessManager.getSession(roomID);
    if (sess == null) {
      SessManager.addSession(roomID)
      sess = SessManager.getSession(roomID)
  }
  else {
    if (socketXID == sess.playerXID) {
      socket.emit("x rejoins", sess.boardState, sess.boardStateSize)
    }
    if (socketOID == sess.playerOID) {
      socket.emit("o rejoins", sess.boardState, sess.boardStateSize)
    }
  }
  if (sess != null) {
    if (sess.gameStarted == false) {
      if (sockets.length == 1) { //you are host
        let xid = crypto.randomUUID()
        sess.playerXID = xid
        socket.emit("start x", xid)
      }
      if (sockets.length == 2) { //you are guest
        socket.to(roomID).emit("start game")
        let OID = crypto.randomUUID()
        socket.emit("give o id", OID)
        sess.playerOID = OID
        sess.gameStarted = true
      }
    }
  }
    // console.log(sockets)

    // console.log(socket.rooms)
    // console.log("socket id is: " + socket.id)
  });

  socket.on("next turn", (squareNum, player) => {
    let [roomID] = socket.rooms;
    let session = SessManager.getSession(roomID)
    session.setSquare(squareNum, player)
    socket.to(roomID).emit("made turn", squareNum)
    console.log(session.boardState)
    console.log(session.xid, session.oid)
  });

  socket.on("set board size", size => {
    let [roomID] = socket.rooms
    let session = SessManager.getSession(roomID)
    session.boardStateSize = size
    socket.to(roomID).emit("set board size", size)
  })
});
// app.get('/game', (req, res) => {

// });
// app.get('/game/:id', (req, res) => {

// });
// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World!');
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//run with main