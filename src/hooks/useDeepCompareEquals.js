function deepCompareEquals(a, b) {
  // TODO: implement deep comparison here
  // something like lodash
  // return _.isEqual(a, b);
}

export function useDeepCompareMemoize(value) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
