var expect = require("expect");
var { generateMessage, generateLocationMessage } = require("./message");

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

describe("generateLocationmessage", () => {
    it("Should generate correct location object for url", () => {
        var from = "Steven";
        var latitude = 55.849696;
        var longitude = -4.2077367;
        var url = "https://www.google.com/maps?q=55.849696,-4.2077367"
        var msg = generateLocationMessage(from, latitude, longitude);

        expect(msg.createdAt).toBeA("number");
        expect(msg.from).toBe(from);
        expect(msg.url).toInclude(latitude);
        expect(msg.url).toInclude(longitude);
        expect(msg.url).toBe(url);
    });
});