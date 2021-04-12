function throttled(fn, wait) {
  let pre = 0;
  return function (...args) {
    let now = +new Date();
    if (now - pre >= wait) {
      fn.call(this, args);
      pre = now;
    }
  };
}
function throttled2(fn, wait) {
  let timeout;
  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(this, arguments);
      }, wait);
    }
  };
}
