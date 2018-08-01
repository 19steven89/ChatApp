[{
    id: "",
    name: "",
    room: ""
}]

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        //call the function below to get the object with the id passed in 
        var userId = this.getUser(id);

        if (userId) {
            //remove item from the array by filtering the array and removing the item with the id passed in
            this.users = this.users.filter((userId) => userId.id !== id);
        }

        return userId;
    }

    getUser(id) {
        //return the first item using: [0]
        var userId = this.users.filter((user) => user.id === id)[0];
        return userId;
    }

    getUserList(room) {
        //using the js array filter method. 
        //Save the list of users in the specific room name passed into this function to the users var listed below.
        var users = this.users.filter((user) => user.room === room);

        //save the user.name value to the namesArray var, used to get a list of the current users in the room
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = { Users };