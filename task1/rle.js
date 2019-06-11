module.exports = (array) => {
  let result = ``;
  let repetition = 0;

  array.forEach((char, index) => {
    repetition++;

    if(array[index + 1] != char) {
      result += `${repetition}${char}`;
      repetition = 0;
    }
  });

  return result;
};