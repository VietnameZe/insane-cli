const assert = require("assert");
const appp = require("../data");

describe("Test some functions", function () {
  describe("sample testing #indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe("Test getURLs(urls)", function () {
    it("should return 2", function () {
      let str = "http://www.google.com, how is im hey asdjhg kj";
      var arr = [];
      arr = appp.Data.getURLs(str);
      assert.equal(arr.length, 1);
    });
  });

  describe("Test getStatus(url)", function () {
    it("should return 200", function () {
      // assert.equal(appp.Data.getStatus('https://www.google.com'), '200')
      appp.Data.getStatus("http://google.com").then((data) => {
        assert.equal(data.toString(), "200");
      });
    });

    it("should return 404", function () {
      // assert.equal(appp.Data.getStatus('https://www.google.com'), '200')
      appp.Data.getStatus("http://ww8.google.com").then((data) => {
        assert.equal(data.toString(), "404");
      });
    });

    it("should return 0 | Sending No links, only integer", function () {
      // assert.equal(appp.Data.getStatus('https://www.google.com'), '200')
      appp.Data.getStatus("1234").then((data) => {
        assert.equal(data.toString(), "0");
      });
    });
  });
});
