const numberTag = "[object Number]";
const stringTag = "[object String]";
const booleanTag = "[object Boolean]";
const symbolTag = "[object Symbol]";
const arrayTag = "[object Array]";
const setTag = "[object Set]";
const mapTag = "[object Map]";
const weakSetTag = "[object WeakSet]";
const weakMapTag = "[object WeakMap]";
const objectTag = "[object Object]";
const argumentsTag = "[object Arguments]";
const dateTag = "[object Date]";
const dataViewTag = "[object DataView]";
const regexpTag = "[object RegExp]";
const errorTag = "[object Error]";
const arrayBufferTag = "[object ArrayBuffer]";
const int8Tag = "[object Int8Array]";
const int16Tag = "[object Int16Array]";
const int32Tag = "[object Int32Array]";
const uint8Tag = "[object Uint8Array]";
const uint8ClampedTag = "[object Uint8ClampedArray]";
const float32Tag = "[object Float32Array]";
const float64Tag = "[object Float64Array]";
const uint16Tag = "[object Uint16Array]";
const uint32Tag = "[object Uint32Array]";

const clonable = {};
clonable[numberTag] = clonable[stringTag] = clonable[booleanTag] = clonable[
  symbolTag
] = clonable[arrayTag] = clonable[setTag] = clonable[mapTag] = clonable[
  objectTag
] = clonable[argumentsTag] = clonable[dateTag] = clonable[
  dataViewTag
] = clonable[regexpTag] = clonable[arrayBufferTag] = clonable[
  int8Tag
] = clonable[int16Tag] = clonable[int32Tag] = clonable[uint8Tag] = clonable[
  uint8ClampedTag
] = clonable[float32Tag] = clonable[float64Tag] = clonable[
  uint16Tag
] = clonable[uint32Tag] = true;

clonable[errorTag] = clonable[weakSetTag] = clonable[weakMapTag] = false;

const getTag = (value) => Object.prototype.toString.call(value);
const initArray = (arr) => {
  const { length } = arr;
  let res = [];
  if (length && typeof arr[0] === "string" && typeof arr.input === "string") {
    res.input = arr.input;
    res.index = arr.index;
  }
  return res;
};
const initObj = (value) => {
  return Object.create(Object.getPrototypeOf(value));
};

function initByTag(value, tag) {
  const Ctor = value.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(value);
    case dataViewTag:
      return cloneDataView(value);
    case regexpTag:
      return cloneRegexp(value);
    case numberTag:
    case stringTag:
      return new Ctor(value);
    case dateTag:
    case booleanTag:
      return new Ctor(+value);
    case mapTag:
    case setTag:
      return new Ctor();
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case float32Tag:
    case float64Tag:
    case uint16Tag:
    case uint32Tag:
      return cloneTypeArray(value);
    case symbolTag:
      return cloneSymbol(value);
  }
}
const isObject = (value) => {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
};
function simpleDeepClone(value, map) {
  if (!isObject(value)) return value;
  let res;
  const isArray = Array.isArray(value);
  const tag = getTag(value);
  //uncloneable type
  if (isArray) {
    res = initArray(value);
  } else {
    const isFunc = typeof value === "function";
    //arguments, object, function
    if (tag === objectTag || tag === argumentsTag) {
      res = initObj(value);
    } else {
      if (clonable[tag] !== true) return {};
      res = initByTag(value, tag);
    }
  }

  map || (map = new WeakMap());
  let maped = map.get(value);
  if (maped) return map.get(value);
  map.set(value, res);
  //typedarray

  //set
  if (tag === setTag) {
    value.forEach((subValue) => {
      res.add(simpleDeepClone(subValue, map));
    });
  }
  //map
  if (tag === mapTag) {
    value.forEach((subValue, key) => {
      res.set(key, simpleDeepClone(subValue, map));
    });
  }
  //array & object
  //assignValue
  let props = isArray ? undefined : getAllKeys(value);
  arrayEach(props || value, (key, subValue) => {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    assignValue(res, key, simpleDeepClone(subValue, map));
  });
  return res;
}

const getAllKeys = (obj) => {
  const keys = Object.keys(obj);
  if (!Array.isArray(obj)) {
    keys.push(...getSymbols(obj));
  }
  return keys;
};

const getSymbols = (obj) => {
  if (obj === null) return [];
  obj = Object(obj);
  return Object.getOwnPropertySymbols(obj).filter((value) =>
    Object.prototype.propertyIsEnumerable.call(value)
  );
};

const arrayEach = (arr, iter) => {
  let index = -1;
  const length = arr.length;
  while (++index < length) {
    if (iter(index, arr[index]) !== false) continue;
  }
  return arr;
};

const assignValue = (tar, key, subValue) => {
  if (key === "__proto__") {
    Object.defineProperty(tar, key, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: subValue,
    });
  } else {
    tar[key] = subValue;
  }
};

let set = new Set();
set.add(1);
set.add(2);
let a = {
  userInfo: {
    name: "一破码代码的",
    foo: 111,
    video: { title: set, info: "some description" },
  },
  arr: [1, 2, 3, 4],
};
let b = simpleDeepClone(a);
console.log(b);
b.userInfo.video.title.add(4);
console.log(a.userInfo.video.title);
console.log(b.userInfo.video.title);
