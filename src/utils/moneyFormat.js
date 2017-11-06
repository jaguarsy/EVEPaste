const formatter = (num) => {
  if (num <= 0) {
    return '0';
  } else if (num < 1000) {
    return num.toFixed(2);
  } else if (num < 1000000) {
    return (num / 1000).toFixed(2) + ' Thousand';
  } else if (num < 1000000000) {
    return (num / 1000000).toFixed(2) + ' Million';
  } else if (num < 1000000000000) {
    return (num / 1000000000).toFixed(2) + ' Billion';
  } else if (num < 1000000000000000) {
    return (num / 1000000000000).toFixed(2) + ' Trillion';
  } else if (num < 1000000000000000000) {
    return (num / 1000000000000000).toFixed(2) + ' Quadrillion';
  }

  return 'too big';
};

module.exports = (number) => {
  if (typeof number === 'number') {
    return formatter(number);
  }
  return '0';
};