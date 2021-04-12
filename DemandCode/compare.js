function compare(root1, root2) {
  if (!equal(root1, root2)) return false;
  let children1 = root1.children;
  let children2 = root2.children;
  if (children1.length !== children2.length) return false;
  let i = -1,
    len = children1.length;
  while (++i < len) {
    if (compare(children1[i], children2[i]) === false) return false;
  }
  return true;
}

function equal(node1, node2) {
  //judge whether node1 has same props with node2
  if (node1.tagName !== node2.tagName) return false;
  return true;
}
