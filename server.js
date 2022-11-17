const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http,{
    cors:{
        origin: '*'
    }
})

app.get('/', (req,res) => {
    res.send('hello')
})

let userList = new Map();

io.on('connection', socket => {
    let username = socket.handshake.query.username;
    addUser(username, socket.id)
    socket.broadcast.emit(username)
    

    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    socket.on('message', msg => {
        socket.broadcast.emit('message-broadcast', {message: msg, username: username})
    })

    socket.on('disconnect', res => {
        removeUser(username, socket.id);
        socket.emit('user-list', [...userList.keys()]);
    })
})

function addUser(username, id){
    if(!userList.has(username)){
        userList.set(username, new Set(id))
    } else {
        userList.get(username).add(id)
    }
}

function removeUser(username, id){
    if(userList.has(username)){
        let userIds = userList.get(username)
        userList.delete(username)
    }
}

http.listen(3000, () => {
    console.log('Listening on port 3000')
})