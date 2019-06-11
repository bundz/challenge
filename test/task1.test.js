const { expect } = require(`chai`);
const rle = require(`../task1/rle`);

describe(`Task #1 - run length encoding`, () => {
  context(`when executing for empty array`, () => {
    it(`should return empty string`, () => {
      expect(rle([])).to.be.equals(``);
    });
  });

  context(`when executing for ['a', 'a', 'a']`, () => {
    it(`should return 3a`, () => {
      expect(rle(['a', 'a', 'a'])).to.be.equals(`3a`);
    });
  });

  context(`when executing for ['a', 'b', 'c']`, () => {
    it(`should return 1a1b1c`, () => {
      expect(rle(['a', 'b', 'c'])).to.be.equals(`1a1b1c`);
    });
  });

  context(`when executing for ['m', 'm', 'm', 'o', 'o', 'o', 't', 't', 'o', 'o', 'r', 'r', 'r', 'r', 'r', 'w', 'w', 'a', 'y', 'y', 'y', 'y']`, () => {
    it(`should return 3m3o2t2o5r2w1a4y`, () => {
      expect(rle(['m', 'm', 'm', 'o', 'o', 'o', 't', 't', 'o', 'o', 'r', 'r', 'r', 'r', 'r', 'w', 'w', 'a', 'y', 'y', 'y', 'y'])).to.be.equals(`3m3o2t2o5r2w1a4y`);
    });
  });

  context(`when executing for ['m', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 't', 't', 't', 't', 't', 't', 't', 'r', 'r', 'r', 'r']`, () => {
    it(`should return 11m7t4r`, () => {
      expect(rle( ['m', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 't', 't', 't', 't', 't', 't', 't', 'r', 'r', 'r', 'r'])).to.be.equals(`11m7t4r`);
    });
  });
});