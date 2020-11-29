const assert = require("assert");
const appp = require("../util");

describe("Test some functions in Util.js module", function () {
  describe("Test readFiles(fileName) function", function () {
    it("should return ABC", function () {
      appp.readFiles("testFile.txt").then((data) => {
        assert.equal(data.toString(), "ABC");
      });
    });
  });
});
