let _state; // 把 state 存储在外面

function useState(initialValue) {
  _state = _state | initialValue; // 如果没有 _state，说明是第一次执行，把 initialValue 复制给它
  function setState(newState) {
    _state = newState;
  }
  return [_state, setState];
}
function render() {
  const [count, setCount] = useState(0);
  console.log(count);
  setCount(2);
}
render();
render();
