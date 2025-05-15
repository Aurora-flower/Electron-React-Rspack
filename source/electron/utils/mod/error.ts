export function errorMessage(e: unknown): string | unknown {
  return e instanceof Error ? e.message : e
}
