const express = require('express');
const cors = require('cors');

const { 
    addUser,
    userList 
} = require('./ServerUtils/users')
const {
    formatMessage
} = require('./ServerUtils/messages');
const { connect } = require('http2');

const messageList = []

console.log(messageList, 'top')

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http,{
    cors:{
        origin: '*'
    }
})

app.get('/', (req,res) => {
    messageList
})

io.on('connection', socket => {
    let username = socket.handshake.query.username;
    let room = socket.handshake.query.room;

    socket.on('user-message', (msg) => {
        messageList.push(formatMessage(msg))
        io.emit('message-update', messageList)
    })

    socket.emit('message-update', messageList)

    socket.on('join-chat', ({username, room}) => {
        // add user to chat list
        addUser(username, room, socket.id)

        // welcome user to chat
        socket.emit('bot-message', `Welcome to ${room}`)

        messageList.push({
            message: message,
            bot: true,
        })
        

        // announce to chat user has joined
        socket.broadcast.emit('bot-message', `${username} has joined the chat`)

        // send messagelist to user
        socket.emit('message-update', messageList)

        // emit user message
        socket.on('user-message', (msg) => {
            // io.emit('message', formatMessage(msg))
            console.log('message')
            console.log(msg)
            formatMessage(msg);
            io.emit('message-update', messageList)
        })
    })
    
    // socket.broadcast.emit(username)
    

    // socket.broadcast.emit('user-list', [...userList.keys()]);
    // socket.emit('user-list', [...userList.keys()]);

    // socket.on('message', msg => {
    //     socket.broadcast.emit('message-broadcast', {message: msg, username: username})
    // })

    socket.on('disconnect', res => {
        // io.emit('bot-message', `${}`)
        // removeUser(username);
        // socket.emit('user-list', [...userList.keys()]);
    })
    })

// function addUser(username, id){
//     if(!userList.has(username)){
//         userList.set(username, new Set(id))
//     } else {
//         userList.get(username).add(id)
//     }
// }

// function removeUser(username, id){
//     if(userList.has(username)){
//         let userIds = userList.get(username)
//         userList.delete(username)
//     }
// }

http.listen(3000, () => {
    console.log('Listening on port 3000')
})
module.exports = io