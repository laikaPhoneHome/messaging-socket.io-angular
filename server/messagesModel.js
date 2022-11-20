const fs = require('fs/promises')

exports.selectRoom = (roomName) => {
    return fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const db = JSON.parse(data);
        const room = db.roomDB.filter(rooms => rooms.roomName === roomName);
        return room;
    })
}
exports.fetchMessagesByRoom = (roomName) => {
    return fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const db = JSON.parse(data);
        const messages = [];
        db.roomDB.forEach((room) => {
            if(room.roomName === roomName){
                messages.push(...room.messageList);
            }
        })
        return messages;
    })
}
exports.insertMessageByRoom = (message, roomName) => {
    fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const db = JSON.parse(data);
        db.roomDB.forEach((room) => {
            if(room.roomName === roomName){
                room.messageList.push(message);
            }
        })
        const strDb = JSON.stringify(db);
        fs.writeFile(`${__dirname}/db/room.db.json`, strDb);
    })
}
exports.insertRoom = (newRoom) => {
    const { roomName, endDate } = newRoom;
    let existing;

    const room = {
        roomName: newRoom.roomName,
        endDate: newRoom.endDate,
        members: [],
        messageList:[]
    }

    this.selectRoom(roomName)
    .then((room) => {
        room.length 
        ? existing = true
        : existing = false
    })
    .then(() => {
        if(!existing){
            fs.readFile(`${__dirname}/db/room.db.json`)
                .then((data) => {
                const newDb = JSON.parse(data)
                newDb.roomDB.push(room)
                const strDb = JSON.stringify(newDb)
                fs.writeFile(`${__dirname}/db/room.db.json`, strDb)
            })
        }
    })
}
exports.insertUserByRoom = (username, roomName) => {
    fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const db = JSON.parse(data)
        db.roomDB.forEach((room) => {
            if(room.roomName === roomName){
                room.members.push(username)
            }
        })
        const strDb = JSON.stringify(db)
        fs.writeFile(`${__dirname}/db/room.db.json`, strDb)
    })
}
exports.removeUserByRoom = (username, roomName) => {
    fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const db = JSON.parse(data)
        db.roomDB.forEach((room) => {
            if(room.roomName === roomName){
                const index = room.members.indexOf(username)
                room.members.splice(index, 1)
            }
        })
        const strDb = JSON.stringify(db)
        fs.writeFile(`${__dirname}/db/room.db.json`, strDb)
    })
}
exports.fetchUsersByRoom = (roomName) => {
    fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const db = JSON.parse(data)
        const members = [];
        db.roomDB.forEach((room) => {
            if(room.roomName === roomName){
                members.push(...room.members)
            }
        })
        return members
    })
}