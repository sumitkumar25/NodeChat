var expect = require('expect');
var { Users } = require('./users');
var userInstance;
var userObjs = [{
        id: '121',
        name: 'test',
        room: 'test room'
    },
    {
        id: '122',
        name: 'test',
        room: 'test room'
    },
    {
        id: '123',
        name: 'test',
        room: 'test room'
    },
    {
        id: '124',
        name: 'test',
        room: 'abc'
    }
];
beforeEach(() => {
    userInstance = new Users();

    userObjs.forEach((user) => {
        userInstance.addUser(user.id, user.name, user.room);
    });
});
describe('users class', () => {
    it('should create new user', () => {
        userInstance.users = [];
        let user = userObjs[0];
        userInstance.addUser(user.id, user.name, user.room);
        expect(userInstance.users).toEqual([user]);
    });

    it('should get  user', () => {
        let user = userObjs[1];
        console.info(userInstance.users)
        expect(userInstance.getUser(user.id)).toEqual(user);
    });
    it('should remove  user', () => {
        let user = userObjs[2];
        expect(userInstance.removeUser(user.id)).toEqual(user);
        expect(userInstance.users.length).toBe(userObjs.length - 1);
    });
    it('should get room  users', () => {
        let user = userObjs[userObjs.length - 1];
        expect(userInstance.getUserList(user.room)).toEqual([user.name]);
    });
});