const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');

// const { 
//     addUser,
//     userList,
// } = require('./ServerUtils/users')
const {
    formatMessage,
    bot,
} = require('./ServerUtils/messages');
const {
    selectRoom,
    fetchMessagesByRoom,
    insertMessageByRoom,
    insertRoom,
    insertUserByRoom,
    removeUserByRoom,
    fetchUsersByRoom,
} = require('./messagesModel');

const { connect } = require('http2');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http,{
    cors:{
        origin: '*'
    }
})

app.get('/', (req ,res) => {
    fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const db = JSON.parse(data)
        if(db.roomDB){
            res.status(200).send('Message server is up :)')
        } else {
            res.status(500).send('Message server is down :(')
        }
    })
})


io.on('connection', socket => {
    let username = socket.handshake.query.username;
    let roomName = socket.handshake.query.room;
    
    socket.on('join-room', ({username, room}) => {
        const { roomName, endDate} = room;
        
        // confirm room exists
        insertRoom(room)

        // add user to chat list
        insertUserByRoom(username, roomName)

        // announce to chat user has joined
        insertMessageByRoom(
            formatMessage({
                message:`${username} has joined the chat`, 
                username: bot
            }),roomName
        )

        // update user's room member list
        fetchUsersByRoom(roomName)
        .then((members) => {
            io.emit('user-list', members);
        })


        // send messagelist to user
        setTimeout(() => {
                fetchMessagesByRoom(roomName)
            .then((messages) => {
                io.emit('message-update', messages)
            })
        })
        
        
    })
    // emit user message
    socket.on('user-message', (req) => {
        setTimeout(() => {
            insertMessageByRoom(formatMessage(req), roomName)
        })
    })
    socket.on('user-message', () => {
        setTimeout(() => {
            fetchMessagesByRoom(roomName)
            .then((messages) => {
                io.emit('message-update', messages)
            })
        })
    })
})


http.listen(3000, () => {
    console.log('Listening on port 3000')
})