const web3 = require("web3");

const Voting = artifacts.require("Voting");

require("chai").use(require("chai-as-promised")).should();

contract("Voting", ([owner, customer]) => {
  let voting;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    voting = await Voting.new();
  });

  describe("Mock Voting Test", async () => {
    it("opinioncount matches successfully", async () => {
      const count = await voting.opinionCount();
      assert.equal(count, 0);
    });
    it("Name matches successfully", async () => {
      const name = await voting.nam();
      assert.equal(name, "Voting Contract");
    });
  });
});
