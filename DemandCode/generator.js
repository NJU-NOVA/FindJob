const Thunk = function (fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    };
  };
};

function f(a, cb) {
  console.log(a);
  cb();
}
const ft = Thunk(f);
function* gen() {
  yield ft(1);
  yield ft(2);
}
function run(fn) {
  let g = fn();
  function next() {
    let result = g.next();
    if (result.done) return;
    result.value(next);
  }

  next();
}

// run(gen);
let g = gen();
console.log(g.next());
