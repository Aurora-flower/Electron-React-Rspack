class Queue {
  private static instance: Queue | null = null
  private queue: Array<unknown> = []

  static getInstance(): Queue | null {
    if (!Queue.instance) {
      Queue.instance = new Queue()
    }
    return Queue.instance
  }

  enqueue(elements: unknown): void {
    this.queue.push(elements)
  }

  dequeue(): unknown | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.queue.shift()
  }

  peek(): unknown | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.queue[0]
  }

  size(): number {
    return this.queue.length
  }

  isEmpty(): boolean {
    return !this.queue.length
  }

  clear(): void {
    this.queue = []
  }
}

// CircularQueue - 击鼓传花
export class CircularQueue {}

// PriorityQueue
export class PriorityQueue {}

export default Queue
