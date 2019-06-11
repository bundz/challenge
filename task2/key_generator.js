class KeyGenerator {
  constructor(seed, factor) {
    this.factor = factor;
    this.value = seed;
    this.secret = 2147483647;
  }

  next() {
    this.value = (this.value * this.factor) % this.secret;
    return this.value;
  }
}

module.exports = KeyGenerator;