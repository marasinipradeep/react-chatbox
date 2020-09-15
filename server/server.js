const express =require('express');
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const {addUser, removeUser, getUser, getUserInRoom} = require('./users')


const PORT= process.env.PORT || 8080

const router = require('./router');
const users = require('./users');

//Set up socket.io (Refer https://socekt.io/docs/#Using-with-Node-http-server)
//Socket used for real time application because http are slow and used to serve websites
const app =express();
const server =http.createServer(app);
const io=socketio(server);

io.on('connection',(socket)=>{
    //first string should be same exact as front end 'join' then call back function.Something that happens with join
    socket.on('join',({name,room},callback)=>{
      const {error, user} =addUser({id:socket.id,name,room});
      if(error) return callback(error);

      //Focusing on system generated messages
      socket.emit('message', {user:'admin',text:`${user.name}, welcome to the room ${user.room}`})

      //Broadcast Sends message to everyone besides that user
      socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},has joined! `})


      //Join joins user in room
      socket.join(user.room);

      //
      io.to(user.room).emit('roomData',{room:user.room,users:getUserInRoom(user.room)})

      callback();
    });

    //Events for user generated messages 
    socket.on('sendMessage', (message,callback)=>{

        const user =getUser(socket.id);

      
        io.to(user.room).emit('message',{user:user.name,text:message})

         //When the user leaves we can send the new messge
         io.to(user.room).emit('roomData',{roomm:user.room,users:getUserInRoom(user.room)})

        //Call callback right here so that they can do somethig after the message is send on the front end
        callback();
    })

    socket.on('disconnect',()=>{
        console.log("user has left");
    });
})

app.use(router);
app.use(cors());

server.listen(PORT,()=>{
    console.log(`Server has started on port ${PORT}`)
})


