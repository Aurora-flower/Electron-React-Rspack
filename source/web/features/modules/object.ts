export function targetHasOwnProperty<T>(
  obj: T,
  key: string | number | symbol
): obj is T & Record<string | number | symbol, unknown> {
  return Object.hasOwn(obj, key) // boolean
}
