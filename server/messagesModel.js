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
    const currentMessages =  exports.fetchMessagesByRoom(roomName)
    currentMessages[roomName].push(message)
    const messageString =  JSON.stringify(currentMessages)

    fs.writeFile(`${dir}/message.db/${roomName}`, messageString)
}
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
