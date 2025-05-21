import { webWarn } from "@/utils/log"

class ListenerCollect {
  public static readonly Events = ["resize", "message"] as const

  private static listeners: Record<
    string,
    Array<{
      callback: EventListener
      options?: AddEventListenerOptions | boolean
    }>
  > = {}

  public static addListener(
    event: string,
    callback: EventListener,
    options?: AddEventListenerOptions | boolean
  ): void {
    if (!ListenerCollect.listeners[event]) {
      ListenerCollect.listeners[event] = []
    }

    const hasExisting = ListenerCollect.listeners[event].some(
      entry => entry.callback === callback && entry.options === options
    )

    if (!hasExisting) {
      ListenerCollect.listeners[event].push({ callback, options })
      window.addEventListener(event, callback, options)
    }
  }

  public static removeListener(event: string): void {
    const listeners = ListenerCollect.listeners[event]
    if (listeners) {
      for (const { callback, options } of listeners) {
        window.removeEventListener(event, callback, options)
      }
      ListenerCollect.listeners[event] = []
    }
  }

  public static removeSpecificListener(
    event: string,
    callback: EventListener,
    options?: AddEventListenerOptions | boolean
  ): void {
    const collect = ListenerCollect.listeners[event]
    if (collect) {
      const index = collect.findIndex(
        entry => entry.callback === callback && entry.options === options
      )
      if (index !== -1) {
        const [removed] = collect.splice(index, 1)
        window.removeEventListener(event, removed.callback, removed.options)
      }
    } else {
      webWarn("ListenerCollect", `No listener found for event: ${event}`)
    }
  }

  public static clearAllListeners(): void {
    for (const event in ListenerCollect.listeners) {
      ListenerCollect.removeListener(event)
    }
  }
}

export function dispatchWindowResize(): void {
  window.dispatchEvent(new Event(ListenerCollect.Events[0]))
}

export function dispatchWindowMessages(data: unknown = null): void {
  window.dispatchEvent(
    new MessageEvent(ListenerCollect.Events[1], { data } as MessageEventInit)
  )
}

export function enableWindowResizeListener(
  callback: EventListener,
  immediately = false,
  options?: AddEventListenerOptions | boolean
): void {
  ListenerCollect.addListener(ListenerCollect.Events[0], callback, options)
  if (immediately) {
    dispatchWindowResize()
  }
}

export function destoryWindowResizeListener(
  callback: EventListener,
  options?: AddEventListenerOptions | boolean
): void {
  ListenerCollect.removeSpecificListener(
    ListenerCollect.Events[0],
    callback,
    options
  )
}

export function enableWindowMessagesListener(
  callback: EventListener,
  immediately = false,
  options?: AddEventListenerOptions | boolean
): void {
  ListenerCollect.addListener(ListenerCollect.Events[1], callback, options)
  if (immediately) {
    dispatchWindowMessages()
  }
}

export function destoryWindowMessagesListener(
  callback: EventListener,
  options?: AddEventListenerOptions | boolean
): void {
  ListenerCollect.removeSpecificListener(
    ListenerCollect.Events[1],
    callback,
    options
  )
}

export function clearAllListeners(): void {
  ListenerCollect.clearAllListeners()
}
