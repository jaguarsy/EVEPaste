module.exports = n => {
  if (!n) {
    return '';
  }

  return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};