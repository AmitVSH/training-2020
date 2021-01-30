const users = []

function joinUser(id, name, room) {
    const user = { id, name, room}
    users.push(user)
    console.log("User: ", user)
    return user
}

function getUser(id) {
    return users.find(user => user.id === id)
}

function removeUser(id) {
    const index = users.findIndex(user => user.id === id)
    if( index !== -1 ) {
        return users.splice(index, 1)[0]
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room)
}


module.exports = {
    joinUser, getUser, removeUser, getRoomUsers
}