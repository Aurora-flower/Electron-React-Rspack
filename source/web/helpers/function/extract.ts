export function extractPartial<T>(obj: T, limit: string[] = []): Partial<T> {
  const limitKeys = limit.length > 0 ? limit : Object.keys(obj as object);
  const result = {} as Partial<T>;
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      limitKeys.includes(key)
    ) {
      result[key] = obj[key];
    }
  }
  return result;
}
