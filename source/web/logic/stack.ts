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
  private _cache: StackElement | undefined
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

  push(commands: StackElement): void {
    this.clearHistory()
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

  /* 撤销 */
  undo(): StackElement | undefined {
    if (!this.canUndo()) {
      return undefined
    }
    if (this._cache && this.historySize() === 0) {
      this.record(this._cache)
    }
    const commands = this._stack.pop()
    if (this.size() >= 1) {
      this.record(commands!)
    }
    // console.log('undo', this._cache, this._history, this.size());
    return commands
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

  /* 取消撤销 */
  redo(): StackElement | undefined {
    // this.cleanStack();
    if (!this.canRedo()) {
      return undefined
    }
    const commands = this._history.pop()
    if (this.historySize() >= 1) {
      this._stack.push(commands!)
    }
    // console.log('redo', this._cache, this._stack, this.historySize());
    return commands
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
