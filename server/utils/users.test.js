const expect = require("expect");

const { Users } = require("./users.js");

describe("Users", () => {

    var users;

    beforeEach(() => {
        users = new Users();

        users.users = [{
            id: "1",
            name: "Mike",
            room: "Node Course"
        }, {
            id: "2",
            name: "Bob",
            room: "JS Course"
        }, {
            id: "3",
            name: "John",
            room: "Node Course"
        }, {
            id: "4",
            name: "Ross",
            room: "Node Course"
        }];
    });

    it("should add a new user", () => {
        var users = new Users();
        var user = {
            id: "123",
            name: "Steven",
            room: "The office fans"
        };

        var responseUser = users.addUser(user.id, user.name, user.room);

        //1st users var refers to users var above, the 2nd refers to the users array defined in the users.js class file
        //expect that one object is added to the users array containing the object data above
        expect(users.users).toEqual([user]);
        expect(user.id).toInclude("123");
    });

    it("Should remove a user", () => {
        var removeThisUser = users.removeUser("4");
        expect(removeThisUser.id).toBe("4");
        expect(users.users).toNotContain(users.users[3]);
        expect(users.users.length).toBe(3);
    });

    it("Should NOT remove a user with invalid ID", () => {
        var removeThisUser = users.removeUser("5");
        expect(removeThisUser).toNotExist();
        expect(removeThisUser).toBe(undefined);
    });

    it("Should find a user", () => {
        var findUser = users.getUser("1");
        expect(findUser).toInclude(users.users[0]);
        expect(findUser.id).toBe(users.users[0].id);
    });

    it("Should NOT find an invalid user", () => {
        var findUser = users.getUser("ID:4")
        expect(findUser).toNotExist();
    });


    it("Should return names for the Node Course Chat room created in the object above", () => {
        var userlist = users.getUserList("Node Course");

        expect(userlist).toEqual(["Mike", "John", "Ross"]);
    });

    it("Should return names for the JS Course Chat room created in the object above", () => {
        var userlist = users.getUserList("JS Course");

        expect(userlist).toEqual(["Bob"]);
    });
});