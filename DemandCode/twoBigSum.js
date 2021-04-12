let n1 = "333333333333333333333333333";
let n2 = "944444444444444444444444444";

const addTwoBigNumber = (a, b) => {
  let res = [];
  a = a.split("");
  b = b.split("");
  let flag = 0;
  let p1 = a.length - 1,
    p2 = b.length - 1;
  while (p1 >= 0 || p2 >= 0) {
    let ans = (p1 !== -1 ? +a[p1] : 0) + (p2 !== -1 ? +b[p2] : 0) + flag;
    [ans, flag] = carry(ans);
    res.unshift(ans);
    p1 >= 0 ? p1-- : null;
    p2 >= 0 ? p2-- : null;
  }
  res.unshift(flag);
  return res.join("");
};

const carry = (ans) => (ans > 9 ? [ans % 10, 1] : [ans, 0]);
console.log(addTwoBigNumber(n1, n2));
