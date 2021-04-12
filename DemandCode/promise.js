const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Ppromise {
  constructor(executor) {
    this.status = PENDING;

    this.value = undefined;

    this.reason = undefined;

    this.onResolvedCallbacks = [];

    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (e) => {
            throw e;
          };

    let promise2 = new Ppromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        }, 0);
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }
  let called;

  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};

Ppromise.prototype.resolve = function (value) {
  let promise = new Ppromise((resolve, reject) => {
    resolvePromise(promise, value, resolve, reject);
  });
  return promise;
};
Ppromise.prototype.reject = (reason) =>
  new Ppromise((resolve, reject) => {
    reject(reason);
  });
Ppromise.prototype.catch = function (cb) {
  return this.then(null, cb);
};
Ppromise.prototype.finally = function (cb) {
  return this.then(
    (value) => {
      return Ppromise.resolve(cb()).then(() => value);
    },
    (reason) => {
      return Ppromise.resolve(cb()).then(() => {
        throw reason;
      });
    }
  );
};
Ppromise.prototype.all = function (promises) {
  return new Ppromise((resolve, reject) => {
    let counter = 0;
    let len = promises.length;
    let res = [];
    for (let i = 0; i < len; i++) {
      (function (i) {
        Ppromise.resolve(promises[i]).then(
          (value) => {
            counter++;
            res.push(value);
            if (len === counter) {
              resolve(res);
            }
          },
          (err) => reject(err)
        );
      })(i);
    }
  });
};
Ppromise.prototype.race = function (promises) {
  return new Ppromise((resolve, reject) => {
    const len = promise.length;
    for (let i = 0; i < len; i++) {
      Ppromise.resolve(promises[i]).then(
        (value) => {
          resolve(value);
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
};
Ppromise.prototype.allSettled = function (promises) {
  return new Ppromise((resolve, reject) => {
    promises = Array.isArray(promises) ? promises : 0;
    let len = promise.length;
    const argsLen = len;
    let res = [];
    if (len === 0) return resolve([]);
    function resolbe(index, value) {
      if (typeof value === "object") {
        const then = value.then;
        if (typeof then === "function") {
          then.call(
            value,
            (val) => {
              res[index] = { status: FULFILLED, value: val };
              if (--len === 0) resolve(res);
            },
            (err) => {
              res[index] = { status: REJECTED, reason: err };
              if (--len === 0) resolbe(res);
            }
          );
        }
      }
    }
    for (let i = 0; i < argsLen; i++) resolbe(i, promises[i]);
  });
};
const promise = new Promise((resolve, reject) => {
  reject("失败");
})
  .then()
  .then()
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log("err", err);
    }
  );
