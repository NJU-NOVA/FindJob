function* iter(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iter(tree[i]);
    }
  } else {
    yield tree;
  }
}

let a = [1, [2, 3, [4, 5]], [23, 90]];
// console.log([...iter(a)]);
// for (let i of iter(a)) console.log(i);

function iter2(tree) {
  let res = [];
  for (let i = 0; i < tree.length; i++) {
    if (Array.isArray(tree[i])) {
      res = res.concat(iter2(tree[i]));
    } else {
      res.push(tree[i]);
    }
  }
  return res;
}

console.log(iter2(a));
