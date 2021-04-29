const Pool = require('multiprocessing').Pool;
(new Pool(4)).map([1, 2, 3], __dirname + '/worker')
  .then(function (res) {
    // [1, 4, 9]
  });