const { json } = require('express');
const fs = require('fs/promises')

exports.selectRoom = (roomName) => {
    return fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const db = JSON.parse(data)
        const room = db.roomDB.filter(rooms => rooms.roomName === roomName)
        return room
    })
}
exports.fetchMessagesByRoom = (roomName) => {
    fs.readFile(`${dir}/message.db/${roomName}`)
    .then((data) => {
        return JSON.parse(data)
    })
}
exports.insertMessage = (message, roomName) => {
    fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const db = JSON.parse(data)
        db.roomDB.forEach((room) => {
            if(room.roomName === roomName){
                room.messageList.push(message)
            }
        })
        const strDb = JSON.stringify(db)
        fs.writeFile(`${__dirname}/db/room.db.json`, strDb)
    })
}
const testMessage = {username: 'tester', message: 'testing'}
exports.insertMessage(testMessage, 'test')
exports.insertRoom = (newRoom) => {
    const { roomName, endDate } = newRoom

    const room = {
        roomName: newRoom.roomName,
        endDate: newRoom.endDate,
        members: [],
        messageList:[]
    }

    fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const newDb = JSON.parse(data)
        newDb.roomDB.push(room)
        const strDb = JSON.stringify(newDb)
        fs.writeFile(`${__dirname}/db/room.db.json`, strDb)
    })

}
exports.selectRoom('test').then((room) => console.log(room))
