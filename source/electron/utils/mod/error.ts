export function errorMessage<T>(e: T): string | T {
  return e instanceof Error ? e.message : e
}
