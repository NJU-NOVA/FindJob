module.exports = function quick(arr) {
  quickSort(arr, 0, arr.length - 1);
  console.log(arr);
};

const quickSort = (arr, l, r) => {
  if (l >= r) return;
  let mid = partition(arr, l, r);
  quickSort(arr, l, mid - 1);
  quickSort(arr, mid + 1, r);
};

const partition = (arr, l, r) => {
  let pviot = l;
  let cur = arr[pviot];
  let i = l,
    j = r;
  while (i < j) {
    while (i < j && arr[j] >= cur) j--;
    while (i < j && arr[i] <= cur) i++;
    swap(arr, i, j);
  }
  swap(arr, l, i);
  return i;
};

const swap = (arr, l, r) => ([arr[l], arr[r]] = [arr[r], arr[l]]);
