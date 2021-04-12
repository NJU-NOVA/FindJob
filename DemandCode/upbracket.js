let data = ["{}[]()", "{[()]}", "[]{()}", "[{()}]", "{()[]}", "{([])}"];
function assert(collection, iter) {
  let index = -1;
  let res = [];
  while (++index < collection.length) {
    if (iter(collection[index]) === false) {
      res.push(false);
    } else {
      res.push(true);
    }
  }
  return res;
}

function isLegal(s) {
  let sml = [],
    mid = [],
    lag = [];
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (process(s.charAt(i), stack, sml, mid, lag) === false) return false;
  }
  return stack.length === 0;
}

function process(s, sta, sm, md, lg) {
  switch (s) {
    case "{":
      if (sm.length !== 0 || md.length !== 0) return false;
      sta.push(s);
      lg.push(s);
      break;
    case "}":
      if (sta[sta.length - 1] === "{") {
        sta.pop();
        lg.pop();
      } else {
        sta.push(s);
        lg.push(s);
      }
      break;
    case "[":
      if (sm.length !== 0) return false;
      sta.push(s);
      md.push(s);
      break;
    case "]":
      if (sta[sta.length - 1] === "[") {
        sta.pop();
        md.pop();
      } else {
        sta.push(s);
        md.push(s);
      }
      break;
    case "(":
      sta.push(s);
      sm.push(s);
      break;
    case ")":
      if (sta[sta.length - 1] === "(") {
        sta.pop();
        sm.pop();
      } else {
        sta.push(s);
        sm.push(s);
      }
      break;
  }
}
console.log(assert(data, isLegal));
