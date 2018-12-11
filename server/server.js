const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

app.get('/rooms',(req,res)=>{
   res.send(users.getRoomList());
});
io.on('connection',(socket)=>{
    console.log('New user connected');


    socket.on('join',(params,callback)=>{
        
        if(isRealString(params.room)&&isRealString(params.activeRoom)){
            callback('Error you have set two rooms,please choose either of them');
        }
        let roomName = params.room || params.activeRoom;
        if(!isRealString(params.name) || !isRealString(roomName) ){
            callback('Name and room name are required');
        } 
        
        // make room case insensitive
        roomName = roomName.toLowerCase();
        // make user unique but not case insensitive
        if(users.getUserList(roomName).indexOf(params.name)!== -1){
            callback('Name already used');
        }


        socket.join(roomName);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,roomName);
        io.to(roomName).emit('updateUserList',users.getUserList(roomName));

        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

        socket.broadcast.to(roomName).emit('newMessage',generateMessage('Admin',`User ${params.name} has joined`));
        callback();
    });

    socket.on('createMessage',(message,callback)=>{
        // console.log('createMessage',message);
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        
        callback();
    });

    socket.on('createLocationMessage',(coords)=>{
        let user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
    });
    socket.on('disconnect',()=>{
        let user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left `))
        }
        console.log('User disconnect');
    });
});

server.listen(port,()=>{
    console.log(`app is listing on port ${port}`);
});