const data = require("./data.json").test1;
function copyArr(arr) {
  return [...arr];
}
const bubble = require("./bubble.js");
const select = require("./select");
const insert = require("./insert");
const shell = require("./shell");
const DM = require("./merge");
const quick = require("./quick");
const heap = require("./heap");
bubble(copyArr(data));
select(copyArr(data));
insert(copyArr(data));
shell(copyArr(data));
DM(copyArr(data));
quick(copyArr(data));
heap(copyArr(data));
