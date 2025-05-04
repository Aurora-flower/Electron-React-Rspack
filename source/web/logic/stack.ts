class Stack {
  private instance: Stack | null = null
  private stack: Array<unknown> = []

  getInstance() {
    if (!this.instance) {
      this.instance = new Stack()
    }
    return this.instance
  }

  push(item: unknown) {
    this.stack.push(item)
  }

  pop() {
    return this.stack.pop()
  }

  peek() {
    return this.stack[this.stack.length - 1]
  }

  size() {
    return this.stack.length
  }

  isEmpty() {
    return this.stack.length === 0
  }

  clear() {
    this.stack = []
  }

  toString() {
    return this.stack.toString()
  }
}

export default Stack
