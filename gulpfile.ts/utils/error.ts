export function errorMessage(error: unknown): string | unknown {
  return error instanceof Error ? error.message : error
}
