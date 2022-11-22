const date = new Date;
const timeStamp = [
    date.getHours(),
    ,':',
    date.getMinutes(),
    ,' ',
    date.getHours > 12
    ? 'am'
    : 'pm'
].join('');

const {
    selectRoom,
    fetchMessagesByRoom,
    insertMessageByRoom,
    insertRoom,
    insertUserByRoom,
    removeUserByRoom,
    fetchUsersByRoom,
} = require('../messagesModel');

exports.bot = '098050q8973451'

exports.formatMessage = (({message, username}) => {
    if(username !== this.bot){
        return({
            message: message,
            username: username,
            my: false,
            liked: false,
            bot: false,
            time: timeStamp,
        })
    } else {
        return({
            message: message,
            bot: true,
        })
    }
    
})

exports.addMember = (username, room) => {
    const {roomName} = room;
    console.log(username, 'addMember', timeStamp)
    fetchUsersByRoom(roomName)
    .then((members) => {
        const memberI = members.indexOf(username)
        console.log(memberI)
        if(memberI !== -1){
            console.log('already in chat')
        } else {
            console.log(username, ' not in chat')
            insertUserByRoom(username, roomName)
            insertMessageByRoom(
                exports.formatMessage({
                message: `${username} has joined the chat`,
                username: exports.bot})
            , roomName)
        }
    })


    
}