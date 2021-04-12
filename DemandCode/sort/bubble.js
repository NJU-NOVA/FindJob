module.exports = function bubble(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j <= i; j++) {
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
  console.log(arr);
};
