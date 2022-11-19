const userList = new Map();

exports.addUser = ((username, room, id) => {
    const userInfo = {room, id};

    userList.set(username, userInfo);
})
