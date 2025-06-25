import CommonUtility from "@/utils/utility"

export interface CommandElement<T = unknown> {
  command: string
  payload: T
}

export type StackElement = CommandElement[]

export const MAX_COUNT = 15

export function generateCommandInfo<T>(
  command: string,
  payload: T
): CommandElement<T> {
  return {
    command,
    payload: CommonUtility.deepCopyJson(payload)
  }
}

class Stack {
  private static instance: Stack
  private _cache: StackElement | undefined // Tip: 永远有一份当前的数据
  private _stack: StackElement[] = []
  private _history: StackElement[] = []

  static getInstance(): Stack {
    if (!Stack.instance) {
      Stack.instance = new Stack()
    }
    return Stack.instance
  }

  cleanStack(): void {
    this._stack = []
  }

  clearHistory(): void {
    this._history = []
  }

  push(commands: StackElement, isClearHistory = true): void {
    if (isClearHistory) {
      this.clearHistory()
    }
    this._stack.push(commands)
    if (this.size() > MAX_COUNT) {
      this._stack.shift()
    }
  }

  record(commands: StackElement): void {
    this._history.push(commands!)
    if (this.historySize() > MAX_COUNT) {
      this._history.shift()
    }
  }

  canUndo(): boolean {
    return this.size() > 0
  }

  canRedo(): boolean {
    return this.historySize() > 0
  }

  undo(): StackElement | undefined {
    if (!this.canUndo()) {
      return undefined
    }
    if (this._cache) {
      this.record(this._cache)
    }
    return this._stack.pop()
  }

  peek(): StackElement | undefined {
    return this._stack[this.size() - 1]
  }

  size(): number {
    return this._stack.length
  }

  historySize(): number {
    return this._history.length
  }

  redo(): StackElement | undefined {
    // this.cleanStack();
    if (!this.canRedo()) {
      return undefined
    }
    if (this._cache) {
      this.push(this._cache, false)
    }
    return this._history.pop()
  }

  getCache(): StackElement | undefined {
    return this._cache
  }

  setCache(cache?: StackElement): void {
    this._cache = cache
  }

  getState(): Readonly<StackElement[]> {
    return [...this._stack]
  }

  getHistory(): Readonly<StackElement[]> {
    return [...this._history]
  }

  clear(): void {
    this._stack = []
    this._history = []
  }
}
export default Stack
