const fs = require('fs/promises')
const atomic = require('atomic-file')
const af = atomic(`${__dirname}/db/room.db.json`)

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
    console.log(message)

    af.get((err, data) => {
        data.roomDB.forEach((room) => {
            if(room.roomName === roomName){
                if(room.messageList.length < 1){
                    room.messageList.push(message);
                }
                if(room.messageList[room.messageList.length-1].message === message.message && message.bot){
                } else {
                    room.messageList.push(message);
                }
            }
        })
        af.set(data,(err) => {
            if(err)
            console.log(err)
        })
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
            af.get((err, data) => {
                data.roomDB.push(room)

                af.set(data, (err) => {
                    if(err)
                    console.log(err)
                })
            })
        }
    })
}

exports.insertUserByRoom = (username, roomName) => {
    af.get((err, data) => {
        const db = {...data}
        let members = [];

        data.roomDB.forEach((room) => {
            if(room.roomName === roomName){
                room.members.push(username)
            }
        })
        af.set(data, (err) => {
            if(err)
            console.log(err)
        })
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
    return fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        const db = JSON.parse(data)
        const members = [];
        db.roomDB.forEach((room) => {
            if(room.roomName === roomName){
                members.push(...room.members)
            }
        })
        return members;
    })
}