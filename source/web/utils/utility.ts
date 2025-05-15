class CommonUtility {
  static errorMessage(e: unknown): string | unknown {
    return e instanceof Error ? e.message : e
  }
}

export default CommonUtility
