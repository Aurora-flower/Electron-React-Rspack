class CommonUtility {
  static errorMessage(e: unknown) {
    return e instanceof Error ? e.message : String(e)
  }
}

export default CommonUtility
