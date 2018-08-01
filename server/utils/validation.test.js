const expect = require("expect");
const { isRealString } = require("./validation.js")

describe("isRealString", () => {


    it("should reject non string values", () => {
        var response = isRealString(100);
        expect(response).toBe(false);

    });

    it("should reject string with only spaces", () => {
        var response = isRealString("       ");
        expect(response).toBe(false);
    });

    it("should allow string with non space characters", () => {
        var response = isRealString("Steven Chat Room message test");
        expect(response).toBe(true);
    });

});