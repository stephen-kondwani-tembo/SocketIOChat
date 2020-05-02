var express = require('express');
var socket = require('socket.io')


//App setup
var app = express();
var server = app.listen(3000, () => {
    console.log('listening to port 3000');
});


//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    //Listening For Chat Event
    socket.on('chat', (data) => {
       io.sockets.emit('chat', data);
    });

    //Listening For Typing Event
    socket.on('typing', (data) => {
       socket.broadcast.emit('typing', data)
     });
});



