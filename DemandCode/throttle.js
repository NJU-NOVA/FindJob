// run immediately
function throttle(func, wait) {
  let pre = 0;
  return function () {
    let now = +new Date();
    if (now - pre >= wait) {
      func.apply(this, arguments);
      pre = now;
    }
  };
}
//run after stop
function throttleTimeout(func, wait) {
  let timeout;
  return function () {
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(this, arguments);
      }, wait);
    }
  };
}
//both
function throttleFinal(func, wait, leading, trailing) {
  let timeout,
    context,
    args,
    pre = 0;
  function later() {
    pre = +new Date();
    timeout = null;
    func.apply(context, args);
  }
  function throttled() {
    let now = +new Date();
    if (!leading && !pre) pre = now;
    context = this;
    args = arguments;
    let remain = wait - (now - pre);
    if (remain <= 0 || remain > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      func.apply(context, args);
    } else if (!timeout && trailing) {
      setTimeout(later, remain);
    }
  }
  return throttled;
}
