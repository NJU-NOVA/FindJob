module.exports = function insert(arr) {
  if (arr.length < 2) return arr;
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i];
    let j = i - 1;
    while (j >= 0 && cur < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = cur;
  }
  console.log(arr);
};
