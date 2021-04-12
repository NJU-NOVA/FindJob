module.exports = function shell(arr) {
  for (
    let gap = Math.floor(arr.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let i = 0; i < gap; i++) {
      for (let j = i + gap; j < arr.length; j += gap) {
        let cur = arr[j];
        let pre = j - gap;
        while (pre >= i && arr[pre] > cur) {
          arr[pre + gap] = arr[pre];
          pre -= gap;
        }
        arr[pre + gap] = cur;
      }
    }
  }
  console.log(arr);
};
