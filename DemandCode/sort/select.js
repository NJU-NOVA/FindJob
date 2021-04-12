module.exports = function insertSort(arr) {
  let l = 0,
    r = arr.length - 1;
  while (l < r) {
    let min = l,
      max = r;
    for (let j = l; j <= r; j++) {
      if (arr[j] > arr[max]) max = j;
      if (arr[min] > arr[j]) min = j;
    }
    [arr[min], arr[l]] = [arr[l], arr[min]];
    [arr[max], arr[r]] = [arr[r], arr[max]];
    l++, r--;
  }
  console.log(arr);
};
