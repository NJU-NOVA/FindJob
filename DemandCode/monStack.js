function bigestRight(arr) {
  let res = [-1];
  let monStack = [[arr.length - 1, last(arr)]];
  for (let i = arr.length - 2; i >= 0; i--) {
    let cur = arr[i];
    if (monStack.length === 0) {
      res.unshift(-1);
      monStack.push([i, cur]);
      continue;
    }
    if (cur < last(monStack)[1]) {
      res.unshift(last(monStack)[0]);
    } else {
      while (monStack.length > 0 && cur >= last(monStack)[1]) {
        monStack.pop();
      }
      if (monStack.length === 0) {
        res.unshift(-1);
      } else {
        res.unshift(last(monStack)[0]);
      }
    }
    monStack.push([i, cur]);
  }
  return res;
}
const last = (arr) => arr[arr.length - 1];
let data = [1, 3, 2, 5, 4, 6, 7, 10];
console.log(bigestRight(data));
