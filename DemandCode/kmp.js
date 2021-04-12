/**
 *
 * @param {string} h
 * @param {sting} n
 */
function kmp(h, n) {
  let next = [];
  buildNext(next, n);
  let i = 0,
    j = -1;
  while (i < h.length && j < n.length) {
    if (j === -1 || h.charAt(i) === n.charAt(j)) {
      i++, j++;
    } else {
      j = next[j];
    }
  }
  if (j === n.length) {
    return i - j;
  }
  return -1;
}

/**
 *
 * @param {number[]} next
 * @param {string} n
 */
function buildNext(next, n) {
  next[0] = -1;
  let i = 0,
    j = -1;
  while (i < n.length) {
    if (j === -1 || n.charAt(i) === n.charAt(j)) {
      i++, j++;
      next[i] = j;
    } else {
      j = next[j];
    }
  }
}

console.log(kmp("aaabbbc", "abbb"));
