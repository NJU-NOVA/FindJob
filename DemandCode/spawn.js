function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        (v) => {
          step(() => gen.next(v));
        },
        (err) => {
          step(() => gen.throw(err));
        }
      );
    }
    step(() => gen.next(undefined));
  });
}
