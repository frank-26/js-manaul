// 由于 useEffect 在 Render 完毕后才执行，因此 ref 的值在当前 Render 中永远是上一次 Render 的
// FIXME: 不要滥用 Ref，Mutable 引用越多，对 React 来说可维护性一般会越差。
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}