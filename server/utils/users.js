class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {
            id: id,
            name: name,
            room: room
        }
        this.users.push(user);
        return user;
    }
    getUser(id) {
        return this.users.filter((user) => {
            return user.id === id;
        })[0];
    }
    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUserList(room) {
        var usersArr = this.users.filter((user) => {
            return user.room === room;
        });
        var names = usersArr.map((u) => u.name);
        return names;
    }
};
module.exports = { Users };