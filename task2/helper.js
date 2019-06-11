const compareLast16Bits = (a, b) => {
  const aLastBits = a & 65535;
  const bLastBits = b & 65535;

  return aLastBits === bLastBits;
};

module.exports = {
  compareLast16Bits
};