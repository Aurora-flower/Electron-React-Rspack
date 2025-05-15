class Stack {
  private static instance: Stack | null = null
  private stack: Array<unknown> = []

  static getInstance(): Stack {
    if (!Stack.instance) {
      Stack.instance = new Stack()
    }
    return Stack.instance
  }

  push(item: unknown): void {
    this.stack.push(item)
  }

  pop(): unknown | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.stack.pop()
  }

  peek(): unknown | undefined {
    return this.stack[this.stack.length - 1]
  }

  size(): number {
    return this.stack.length
  }

  isEmpty(): boolean {
    return this.stack.length === 0
  }

  clear(): void {
    this.stack = []
  }

  toString(): string {
    return this.stack.toString()
  }
}

export default Stack
