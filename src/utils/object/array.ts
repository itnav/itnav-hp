export function arrayfy<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
