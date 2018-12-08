const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit('newMessage',{
        from:'david',
        text:'hello',
        createAt:'31'
    });


    socket.on('createMessage',(message)=>{
        console.log('createMessage',message)
    });
    socket.on('disconnect',()=>{
        console.log('User disconnect');
    });
});

server.listen(port,()=>{
    console.log(`app is listing on port ${port}`);
});