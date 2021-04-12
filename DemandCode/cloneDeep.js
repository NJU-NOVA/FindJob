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

function getTag(value) {
  return Object.prototype.toString.call(value);
}
function isObject(value) {
  return (
    value != null && (typeof value === "object" || typeof value === "function")
  );
}
function initCloneArray(arr) {
  const { length } = arr;
  let res = [];
  if (
    length &&
    typeof arr[0] === "string" &&
    Object.prototype.hasOwnProperty.call(arr, "input")
  ) {
    res.input = arr.input;
    res.index = arr.index;
  }
  return res;
}
function initCloneObject(object) {
  return Object.create(Object.getPrototypeOf(object));
}
function initCloneByTag(value, tag) {
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
function cloneArrayBuffer(arraybuffer) {
  const result = new arraybuffer.constructor(arraybuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arraybuffer));
  return result;
}

function cloneTypeArray(typedArray) {
  const buffer = typedArray.buffer;
  return new typedArray.constructor(
    buffer,
    typedArray.byteOffset,
    typedArray.length
  );
}
function cloneDataView(dataView) {
  const buffer = dataView.buffer;
  return new dataView.constructor(
    buffer,
    dataView.byteOffset,
    dataView.byteLength
  );
}

function cloneRegexp(regexp) {
  const reFlag = /\w*$/;
  const result = new regexp.constructor(regexp.source, reFlag.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

function cloneSymbol(symbol) {
  return Object(Symbol.prototype.valueOf.call(symbol));
}
function isTypedArray(tag) {
  const re = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;
  return re.test(tag);
}
function cloneDeep(value, object, map) {
  let result;
  if (!isObject(value)) return value;
  const isArray = Array.isArray(value);
  const tag = getTag(value);
  if (isArray) {
    result = initCloneArray(value);
  } else {
    const isFunc = typeof value === "function";
    if (tag === argumentsTag || tag === objectTag || (!object && isFunc)) {
      result = isFunc ? {} : initCloneObject(value);
    } else {
      if (isFunc || !clonable[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag);
    }
  }

  map || (map = new WeakMap());
  const maped = map.get(value);
  if (maped) return maped;
  map.set(value, result);

  if (isTypedArray(tag)) return result;

  if (tag === mapTag) {
    value.forEach((subValue, key) => {
      result.set(key, cloneDeep(subValue, value, map));
    });
    return result;
  }
  if (tag === setTag) {
    value.forEach((subValue) => {
      result.add(cloneDeep(subValue, value, map));
    });
    return result;
  }

  const props = isArray ? undefined : getAllKeys(value);

  arrayEach(props || value, (subValue, key) => {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    assignValue(result, key, cloneDeep(subValue, value, map));
  });
  return result;
}

function getAllKeys(obj) {
  const result = Object.keys(obj);
  if (!Array.isArray(obj)) {
    result.push(...getSymbols(obj));
  }
  return result;
}

function getSymbols(obj) {
  if (obj == null) return [];
  obj = Object(obj);
  return Object.getOwnPropertySymbols(obj).filter((symbol) =>
    Object.prototype.propertyIsEnumerable.call(obj, symbol)
  );
}
function arrayEach(arr, iteratee) {
  let index = -1;
  const length = arr.length;
  while (++index < length) {
    if (iteratee(arr[index], index) === false) break;
  }
  return arr;
}

function assignValue(obj, key, value) {
  if (key === "__proto__") {
    Object.defineProperty(obj, key, {
      configurable: true,
      writable: true,
      enumerable: true,
      value: value,
    });
  } else {
    obj[key] = value;
  }
}
let int16 = new Int16Array(10);
let set = new Set();
set.add(1);
set.add(2);
let a = {
  userInfo: {
    name: "一破码代码的",
    foo: int16,
    video: { title: set, info: "some description" },
  },
  arr: [1, 2, 3, 4],
};
let b = cloneDeep(a);
console.log(b);
b.userInfo.video.title.add(4);
console.log(a.userInfo.video.title);
console.log(b.userInfo.video.title);
