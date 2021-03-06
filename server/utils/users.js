class Users {
    constructor() {
        this.users = [];

    }
    addUser(id,name,room){
        let user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        let user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=>user.id!== id);
        }
        return user;
    }
    getUser(id){
        return this.users.filter((user)=> user.id ===id)[0];
    }
    getUserList(room){
        let  users = this.users.filter((user)=> user.room ===room);
        let namesArray = users.map((user)=>user.name);
        return namesArray;
    }
    getRoomList(){
        let roomsArray = this.users.map((user)=>user.room);
        let uniqueRooms = [];
        roomsArray.forEach(element => {
            if(uniqueRooms.indexOf(element)=== -1){
                uniqueRooms.push(element)
            }
        });
        return uniqueRooms;

    }
}

module.exports = {Users};





// class Person {
//     constructor (name ,age){
//         this.name = name;
//         this.age = age;
//     } 
//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }

// let user = new Person('Tom',23);
// let description = user.getUserDescription();
// // console.log(user);
// console.log(description);