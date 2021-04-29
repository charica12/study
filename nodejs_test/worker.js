const P = require('bluebird');

module.exports = function squareAsync(x) {
  return P.resolve().then(() => x * x);
};