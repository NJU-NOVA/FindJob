module.exports = function dm(arr) {
  DM(arr, 0, arr.length - 1);
  console.log(arr);
};

const DM = (arr, l, r) => {
  if (l >= r) return arr[l];
  let mid = Math.floor((l + r) / 2);
  DM(arr, l, mid);
  DM(arr, mid + 1, r);
  let temp = [];
  let i = l,
    j = mid + 1;
  while (i <= mid && j <= r) {
    if (arr[i] > arr[j]) {
      temp.push(arr[j]);
      j++;
    } else {
      temp.push(arr[i]);
      i++;
    }
  }
  while (i <= mid) {
    temp.push(arr[i++]);
  }
  while (j <= r) temp.push(arr[j++]);
  for (let k = l; k <= r; k++) arr[k] = temp[k - l];
};
