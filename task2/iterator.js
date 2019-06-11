const KerGenerator = require(`./key_generator`);
const { compareLast16Bits } = require(`./helper`);

module.exports = (g0, g1, iterations) => {
  const generator0 = new KerGenerator(g0.seed, g0.factor)
  const generator1 = new KerGenerator(g1.seed, g1.factor)
  let matches = 0;

  for (let i = 0; i < iterations; i++) {
    if(compareLast16Bits(generator0.next(), generator1.next())) {
      matches++;
    }
  } 

  return matches;
}