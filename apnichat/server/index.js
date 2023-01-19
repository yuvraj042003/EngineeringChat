const http = require("http");
const express=require('express');
const cors = require('cors');
const socketIO=require('socket.io');
const { Socket } = require("socket.io-client");

const app=express();
const port=4500 || process.env.PORT;

const users = [{}]

app.use(cors());
app.get("/",(req,res)=>{
    res.send("This is working");
})

const server=http.createServer(app);
const io=socketIO(server);
io.on("connection",(socket)=>{
    console.log("New Connection");
    socket.on('joined',({user})=>{
        users[socket.id]=user
        console.log(`${user} has joined Engineer's Chatting App`);
        socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
        socket.emit('welcome',{user:"Admin",message: `Welcome ${users[socket.id]}, in the Engineer's Chatting App. `});
    })
    socket.on('message',({message,id})=>{
        io.emit('sendMessage', {user:users[id],message,id})
    })
    socket.on('disconnect',()=>{
        console.log(`${users[socket.id]} has Left`)
        socket.broadcast.emit('leave',{user:"Admin",message:` ${users[socket.id]} has left`});
    })
});
server.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
})