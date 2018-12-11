const expect = require('expect');


const {Users} = require('./users');

describe('Users',()=>{
    let users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Mike',
            room:'Node'
        },{
            id:'2',
            name:'Julia',
            room:'React'
        },{
            id:'3',
            name:'Yush',
            room:'Node'
        }]
    });
    it('should add new user',()=>{
        let users = new Users();
        let user = {
            id:'123',
            name:'Ferrymania',
            room:'Office'
        };
        let resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user',()=>{
        let userId = '1';
        let user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user',()=>{
        let userId = '99';
        let user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user',()=>{
        let userId = '2';
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user',()=>{
        let userId = '88';
        let user = users.getUser(userId);
        expect(user).toBeFalsy();        
    }); 
    it('Should return names for Node',()=>{
        let userList = users.getUserList('Node');
        expect(userList).toEqual(['Mike','Yush'])
    });

    it('Should return names for React',()=>{
        let userList = users.getUserList('React');
        expect(userList).toEqual(['Julia'])
    });

    it('Should return unique rooms ',()=>{
        let rooms = users.getRoomList();
        expect(rooms.length).toBe(2);
    });
});