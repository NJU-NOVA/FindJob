function myMap(arr, fn) {
  let res = [];
  arr.reduce((p, c, i) => {
    p.push(fn(c, i, arr));
    return p;
  }, res);
  return res;
}

let a = [1, 2, 3, 4, 5, 6];
console.log(myMap(a, (c) => c * c));
