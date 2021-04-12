//simple iterator
function makeSimpleIterator(array) {
  let cursor = 0;
  return {
    next: () =>
      cursor < array.length
        ? { value: array[cursor++], done: false }
        : { value: undefined, done: true },
  };
}

let it = makeSimpleIterator(["a", "b"]);
console.log(it.next());
console.log(it.next());
console.log(it.next());

//symbol iterator api
const iteratorSymbol = {
  [Symbol.iterator]: () => makeSimpleIterator([1, 2]),
};

for (let i of iteratorSymbol) {
  console.log(i);
}

//see this
let arr = [1, 2, 3];
let iter = arr[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

//it works if you realize iterator api on its prototype
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let value = this.value;
    if (value < this.stop) {
      this.value++;
      return { done: false, value: value };
    }
    return { done: true, value: undefined };
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (let value of range(0, 3)) {
  console.log(value);
}
//realize pointer via iterator
function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
  let iterator = { next: next };
  let current = this;
  function next() {
    if (current) {
      let value = current.value;
      current = current.next;
      return { done: false, value: value };
    } else {
      return { done: true };
    }
  }
  return iterator;
};

let one = new Obj(1),
  two = new Obj(2),
  three = new Obj(3);
one.next = two;
two.next = three;

for (let i of one) {
  console.log(i);
}
//iterator in destructuring assignment
let set = new Set().add("a").add("b").add("c");

let [first, ...rest] = set;
console.log(first, rest);
//extension operator
let str = "hello";
console.log([...str]);
//yield*
let generator = function* () {
  yield 1;
  yield* [1, 2, 3];
  yield 5;
};

let iterator = generator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
//experiment
Object.prototype[Symbol.iterator] = function* () {
  for (let key in this) {
    yield [key, this[key]];
  }
};

let a = { a: 1, b: 2 };
for (let [key, value] of a) {
  console.log(key, "->", value);
}
