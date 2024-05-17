/** 値が null の場合 undefined を返却する関数 */
export function undefineNull<T, D>(
  value: T | null,
  defaultValue?: D
): T | D | undefined {
  return value === null
    ? undefined
    : value === undefined
    ? defaultValue
    : value;
}
