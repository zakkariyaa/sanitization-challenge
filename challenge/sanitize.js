function sanitize(string) {
  const stringChars = string.split('');
  const newChars = [];

  for (let char of stringChars) {
    if (char === '<') {
      newChars.push('&lt;');
    } else {
      newChars.push(char);
    }
  }

  return newChars.join('');
}

module.exports = sanitize;
