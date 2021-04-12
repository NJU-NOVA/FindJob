const _ = require("lodash");
function get(tar, ...path) {
  // 请补全函数参数和实现逻辑
  let res = [];
  for (let i = 0; i < path.length; i++) {
    let cur = path[i].replace("[", ".").replace("]", "").split(".");
    let tmp = tar[cur[0]];
    for (let j = 1; j < cur.length; j++) {
      tmp = tmp[cur[j]];
    }
    res.push(tmp);
  }
  return res;
}
const obj = {
  selector: { to: { toutiao: "FE coder" } },
  target: [1, 2, { name: "byted" }],
};
console.log(
  get(obj, "selector", "selector.to.toutiao", "target[0]", "target[2].name")
);
// 输出结果： ['FE coder', 1, 'byted']
