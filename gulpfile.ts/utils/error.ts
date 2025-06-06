export function errorMessage<T>(error: T): string | T {
  return error instanceof Error ? error.message : error
}
