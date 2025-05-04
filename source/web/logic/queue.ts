class Queue {
  private queue: Array<unknown> = []

  getInstance() {
    if (!this.queue.length) {
      return null
    }
    return this.queue.shift()
  }

  enqueue(elements: unknown) {
    this.queue.push(elements)
  }

  dequeue() {
    return this.queue.shift()
  }

  peek() {
    return this.queue[0]
  }

  size() {
    return this.queue.length
  }

  isEmpty() {
    return !this.queue.length
  }

  clear() {
    this.queue = []
  }
}

// CircularQueue - 击鼓传花
export class CircularQueue {}

// PriorityQueue
export class PriorityQueue {}

export default Queue
