const express =require('express');
const socketio = require("socket.io");
const http = require("http");


const PORT= process.env.PORT || 8080

const router = require('./router');

//Set up socket.io (Refer https://socekt.io/docs/#Using-with-Node-http-server)
//Socket used for real time application because http are slow and used to serve websites
const app =express();
const server =http.createServer(app);
const io=socketio(server);

io.on('connection',(socket)=>{
    console.log('We have a new connection!!!');

    socket.on('disconnect',()=>{
        console.log("user has left");
    });
})

app.use(router);

server.listen(PORT,()=>{
    console.log(`Server has started on port ${PORT}`)
})


