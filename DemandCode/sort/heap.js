let len;
module.exports = function heapSort(arr) {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i >= 0; i--) {
    swap(arr, 0, i);
    len--;
    heapfiy(arr, 0);
  }
  console.log(arr);
};

const heapfiy = (arr, i) => {
  let len = arr.length;
  let left = i * 2 + 1,
    right = i * 2 + 2,
    largest = i;
  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    swap(arr, i, largest);
    heapfiy(arr, largest);
  }
};

const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

const buildMaxHeap = (arr) => {
  len = arr.length;
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapfiy(arr, i);
  }
};
