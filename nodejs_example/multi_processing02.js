const Pool = require('multiprocessing').Pool;
 
function anInfiniteLoop() {
  while (true) {}
}
 
const pool = new Pool(4);
 
pool.map([1, 2, 3, 4, 5], anInfiniteLoop, {timeout: 1000})
  .catch(err => console.log(err));