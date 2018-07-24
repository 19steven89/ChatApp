var expect = require("expect");
var { generateMessage } = require("./message");

describe("generateMessage", () => {
    it("should generate a correct message object", () => {
        var from = "Sam";
        var text = "an example test message";
        var msg = generateMessage(from, text);

        expect((msg) => {
            expect(msg.from).toBe(from);
            expect(msg.text).toBe(text);
            expect(msg.createdAt).toBe("number");
            //another way of doinf the first 2 expect statements:
            expect(msg).toInclude({ from, to });
        });

    });
});