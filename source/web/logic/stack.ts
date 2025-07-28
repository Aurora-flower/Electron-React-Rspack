interface CommandMsgDataModel<T = string /* TODO: 定义类型 */> {
  /**
   * @summary 命令类型，用于匹配对应类型的命令分配函数
   */
  ilk: T
  /**
   * @summary 命令名称，用于匹配对应命令执行函数
   */
  command: string
  /**
   * @summary 命令参数
   */
  data: unknown[]
  /**
   * @summary 命令选项
   */
  options?: {
    /**
     * @summary 是否被聚焦(锁定、选中显示)
     */
    focus?: boolean
    /**
     * @summary 是否刷新渲染
     */
    render?: boolean
    /**
     * @summary 是否被记录 Stack
     */
    record?: boolean
  }
}

interface CommandElement<T = unknown> {
  /**
   * @summary 实际执行的命令名称
   * @description
   * 比如：删除节点，此处存的命令则是相反的添加节点操作
   */
  command: string
  /**
   * @summary 命令的参数
   */
  payload: T | CommandMsgDataModel
}

const MAX_COUNT = 20

class Stack {
  private static instance: Stack
  private _normalCache: CommandElement[] = []
  private _state: CommandElement[] = []
  private _history: CommandElement[] = []

  /**
   * @summary 栈中命令数量，是判断当前是否为修改状态的标志
   */
  private _count: number = 0

  static getInstance(): InstanceType<typeof Stack> {
    if (!Stack.instance) {
      Stack.instance = new Stack()
    }
    return Stack.instance
  }

  getState(): Readonly<CommandElement[]> {
    return this._state
  }

  getHistory(): Readonly<CommandElement[]> {
    return this._history
  }

  getNormalCache(): Readonly<CommandElement[]> {
    return this._normalCache
  }

  getCheckCount(): boolean {
    return this._count > 0
  }

  appendCache(cache: CommandElement): void {
    this._normalCache.push(cache)
    if (this.cacheSize() > MAX_COUNT) {
      this._normalCache.shift()
    }
  }

  clearState(): void {
    this._state = []
  }

  clearHistory(): void {
    this._history = []
  }

  canUndo(): boolean {
    return this._state.length > 0
  }

  canRedo(): boolean {
    return this._history.length > 0
  }

  cacheSize(): number {
    return this._normalCache.length
  }

  stateSize(): number {
    return this._state.length
  }

  historySize(): number {
    return this._history.length
  }

  drop(): CommandElement | undefined {
    return this._state.pop()
  }

  dropCache(): CommandElement | undefined {
    return this._normalCache.pop()
  }

  dropHistory(): CommandElement | undefined {
    return this._history.pop()
  }

  peek(): CommandElement {
    return this._state[this.stateSize() - 1]
  }

  peekHistory(): CommandElement {
    return this._history[this.historySize() - 1]
  }

  clear(): void {
    this._normalCache = []
    this._state = []
    this._history = []
    this._count = 0
  }

  push(commands: CommandElement, isRecord: boolean = true): void {
    // if (isCleanHistory) {
    //   this.clearHistory()
    // }
    if (isRecord) {
      this.appendCache(commands)
    }
    this._state.push(commands)
    if (this.stateSize() > MAX_COUNT) {
      this._state.shift()
    }
    this._count++
  }

  record(commands: CommandElement): void {
    this._history.push(commands) // 是否使用 unshift
    if (this.historySize() > MAX_COUNT) {
      this._history.shift()
    }
  }

  undo(): CommandElement | undefined {
    if (!this.canUndo()) {
      return
    }
    this._count--
    if (this.cacheSize() > 0) {
      const commands = this.dropCache()
      this.record(commands!)
    }
    return this.drop()
  }

  redo(): CommandElement | undefined {
    if (!this.canRedo()) {
      return
    }
    if (this.cacheSize() > 0) {
      const commands = this.dropCache()
      this.push(commands!)
    }
    return this.dropHistory()
  }
}

export default Stack
