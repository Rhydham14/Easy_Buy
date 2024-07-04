const socket =require('socket.io');
const cors = require("cors");
require('dotenv').config();

let io;

const IoSocket =(server)=>{

    
    io = socket(server,
        {
            cors:({
                origin: ["http://localhost:3000", "http://192.168.2.126:3000","http://192.168.2.126:3000/","https://easy-buy-qeqn.vercel.app/","https://easy-buy-qeqn.vercel.app","https://easy-buy-5.onrender.com","https://easy-buy-5.onrender.com/","*"],
                      
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
              })
        }
    )
    io.on("connection",(socket)=>{
        console.log('A user connected');

        // socket.on('chat', (data) => {
        //     io.sockets.emit('chat', data) // emit message to other client
        // })
        socket.on('clientEvent', (data) => {
            // broadcast message to all except own user
            // socket.emit('typing', data)
            console.log("data sockrt", data);
        })
        socket.on('disconnect', () => {
            console.log('User disconnected');
          });
    })
}

module.exports = {IoSocket, io};

