const { expect } = require(`chai`);
const { compareLast16Bits } = require(`../task2/helper`);
const KeyGenerator = require(`../task2/key_generator`);
const iterator = require(`../task2/iterator`);

describe(`Task #2 - iterations and key generation`, () => {
  describe(`CompareLast16Bits`, () => {
    context(`when sending 245556042, 1431495498`, () => {
      it(`should return true`, () => {
        expect(compareLast16Bits(245556042, 1431495498)).to.be.true;
      });
    });

    context(`when sending 10, 6`, () => {
      it(`should return false`, () => {
        expect(compareLast16Bits(10, 6)).to.be.false;
      });
    });

    context(`when sending 178258168, 248`, () => {
      it(`should return false`, () => {
        expect(compareLast16Bits(178258168, 248)).to.be.true;
      });
    });
  });

  describe(`KeyGenerator`, () => {
    context(`when instancing with seed 65 and factor 16807`, () => {
      const generator = new KeyGenerator(65, 16807);

      it(`first iteration should be 1092455`, () => {
        expect(generator.next()).to.be.equals(1092455);
      });

      it(`second iteration should be 1181022009`, () => {
        expect(generator.next()).to.be.equals(1181022009);
      });

      it(`third iteration should be 245556042`, () => {
        expect(generator.next()).to.be.equals(245556042);
      });
    });

    context(`when instancing with seed 8921 and factor 48271`, () => {
      const generator = new KeyGenerator(8921, 48271);

      it(`first iteration should be 430625591`, () => {
        expect(generator.next()).to.be.equals(430625591);
      });

      it(`second iteration should be 1233683848`, () => {
        expect(generator.next()).to.be.equals(1233683848);
      });

      it(`third iteration should be 1431495498`, () => {
        expect(generator.next()).to.be.equals(1431495498);
      });
    });
  });

  describe(`Iterator`, () => {
    context(`when executing for seed1 65, seed2 8921, factor1 16807, factor2 48271 and iterations 3`, () => {
      it(`should return 1 as result`, () => {
        expect(iterator({ seed: 65, factor: 16807 }, { seed: 8921, factor: 48271 }, 3)).to.be.equals(1);
      });
    });

    context(`when executing for seed1 65, seed2 8921, factor1 16807, factor2 48271 and iterations 1000000`, () => {
      it(`should return 12 as result (This is the answer :))`, () => {
        expect(iterator({ seed: 65, factor: 16807 }, { seed: 8921, factor: 48271 }, 1000000)).to.be.equals(12);
      });
    });
  });
});