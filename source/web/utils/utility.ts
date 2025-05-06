class CommonUtility {
  static errorMessage(e: unknown) {
    return e instanceof Error ? e.message : e
  }
}

export default CommonUtility
