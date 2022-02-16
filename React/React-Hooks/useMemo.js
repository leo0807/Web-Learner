/**
使用useMemo的场景
1. 有些计算开销很大，我们就需要「记住」它的返回值，避免每次 render 都去重新计算。
2. 由于值的引用发生变化，导致下游组件重新渲染，我们也需要「记住」这个值。
 */

// https://zhuanlan.zhihu.com/p/85969406

// React.memo
// 因此，当Child被memo包装后，就只会当props改变时才会重新渲染了。


let hookState = [];
let hookIndex = 0;

function useMemo(callback, dependencies) {
  if (hookState[hookIndex]) {
    const [oldData, oldDenpendencies] = hookState[hookIndex];
    // 空数组 every为true
    let same = oldDenpendencies.every((item, index) => item === oldDenpendencies[index]);
    if (same) {
      hookIndex++;
      return oldData;
    } else {
      const newData = callback();
      hookState[hookIndex++] = [newData, dependencies];
    }
    // 非首次渲染
  } else {
    // 首次渲染
    const newData = callback();
    hookState[hookIndex++] = [newData, dependencies];
  }
}

// 可以用与在重新渲染的时候保持值的饮用不变

const useRef = (v) => {
  return useMemo(() => ({ current: v }), []);
};

/**
无需使用 useMemo 的场景
1. 如果返回的值是原始值： string, boolean, null, undefined, number, symbol（不包括动态声明的 Symbol），
一般不需要使用 useMemo。
2. 仅在组件内部用到的 object、array、函数等（没有作为 props 传递给子组件），
且没有用到其他 Hook 的依赖数组中，一般不需要使用 useMemo。
 */


//  通过 ref 来保存可变变量。例如：

export const useCount = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  });

  const [increase, decrease] = useMemo(() => {
    const increase = () => {
      setCount(countRef.current + 1);
    };

    const decrease = () => {
      setCount(countRef.current - 1);
    };
    return [increase, decrease];
  }, []); // 保持依赖数组为空，这样 increase 和 decrease 方法都只会被创建一次

  return [count, increase, decrease];
};