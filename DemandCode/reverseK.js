function reverseKGroup(head, k) {
  // write code here
  if (!head || !head.next || k < 2) return head;
  let dummy = new ListNode(0);
  dummy.next = head;
  let pre = dummy,
    cur = head,
    tmp;
  let len = 0;
  while (head) {
    len++;
    head = head.next;
  }
  for (let i = 0; i < Math.floor(len / k); i++) {
    for (let j = 1; j < k; j++) {
      tmp = cur.next;
      cur.next = tmp.next;
      tmp.next = pre.next;
      pre.next = tmp;
    }
    pre = cur;
    cur = cur.next;
  }
  return dummy.next;
}
