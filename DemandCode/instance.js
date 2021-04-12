function instanceof2(obj, ctor) {
  while (obj.__proto__) {
    if (ctor.prototype === obj.__proto__) return true;
    obj = obj.__proto__;
  }
  return false;
}

let a = [];
let b = "string";
console.log(instanceof2(a, Array));
console.log(instanceof2(b, String));
