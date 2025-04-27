class ListenerCollect {
  private static listeners: Record<
    string,
    Array<{
      callback: EventListener;
      options?: AddEventListenerOptions | boolean;
    }>
  > = {};

  public static addListener(
    event: string,
    callback: EventListener,
    options?: AddEventListenerOptions | boolean
  ): void {
    if (!ListenerCollect.listeners[event]) {
      ListenerCollect.listeners[event] = [];
    }

    const hasExisting = ListenerCollect.listeners[event].some(
      (entry) => entry.callback === callback && entry.options === options
    );

    if (!hasExisting) {
      ListenerCollect.listeners[event].push({ callback, options });
      window.addEventListener(event, callback, options);
    }
  }

  public static removeListener(event: string): void {
    const listeners = ListenerCollect.listeners[event];
    if (listeners) {
      listeners.forEach(({ callback, options }) => {
        window.removeEventListener(event, callback, options);
      });
      ListenerCollect.listeners[event] = [];
    }
  }

  public static removeSpecificListener(
    event: string,
    callback: EventListener,
    options?: AddEventListenerOptions | boolean
  ): void {
    const listeners = ListenerCollect.listeners[event];
    if (listeners) {
      const index = listeners.findIndex(
        (entry) => entry.callback === callback && entry.options === options
      );
      if (index !== -1) {
        const [removed] = listeners.splice(index, 1);
        window.removeEventListener(event, removed.callback, removed.options);
      }
    }
  }

  public static clearAllListeners(): void {
    for (const event in ListenerCollect.listeners) {
      ListenerCollect.removeListener(event);
    }
  }
}

export function enableWindowResizeListener(
  callback: EventListener,
  immediately = false,
  options?: AddEventListenerOptions | boolean
) {
  const eventName = "resize";
  ListenerCollect.addListener(eventName, callback, options);
  if (immediately) {
    window.dispatchEvent(new Event(eventName));
  }
}

export function destoryWindowResizeListener(
  callback: EventListener,
  options?: AddEventListenerOptions | boolean
) {
  ListenerCollect.removeSpecificListener("resize", callback, options);
}

export function enableWindowMessagesListener(
  callback: EventListener,
  immediately = false,
  options?: AddEventListenerOptions | boolean
) {
  const eventName = "message";
  ListenerCollect.addListener(eventName, callback, options);
  if (immediately) {
    window.dispatchEvent(new MessageEvent(eventName, { data: null }));
  }
}

export function disableWindowMessagesListener(
  callback: EventListener,
  options?: AddEventListenerOptions | boolean
) {
  ListenerCollect.removeSpecificListener("message", callback, options);
}

export function clearAllListeners() {
  ListenerCollect.clearAllListeners();
}
