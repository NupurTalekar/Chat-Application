
/*const io = require('socket.io')(8000, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST']
  }
});


const users={};

io.on('connection', (socket) =>{
   socket.on('new-user-joined', (name) =>{
     console.log("New user", name);
     users[socket.id]= name;
     socket.broadcast.emit('user-joined', name);
})
   socket.on('send', (message) =>{
     socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
   });

   socket.on('disconnect', ()=>{
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id]});

  });*/

  const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 8000;

// Serve static files from the public directory
app.use(express.static(__dirname));

const users = {};

io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.on('new-user-joined', (name) => {
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
