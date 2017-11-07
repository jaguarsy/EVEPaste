const electron = require('electron');

const clipboard = electron.clipboard;

module.exports = (opts = { delay: 1000 }) => {
  let lastText;
  setInterval(() => {
    const text = clipboard.readText();
    if (opts.onTextChange
      && (text && lastText !== text)
      && text.indexOf('http://') < 0
      && text.indexOf('https://') < 0) {
      lastText = text;
      opts.onTextChange(text);
    }
  }, opts.delay);
};
