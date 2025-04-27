class ListenerCollect {
  private static listeners: Record<string, EventListener[]> = {};

  public static addListener(event: string, callback: EventListener): void {
    if (!ListenerCollect.listeners[event]) {
      ListenerCollect.listeners[event] = [];
    }

    if (!ListenerCollect.listeners[event].includes(callback)) {
      ListenerCollect.listeners[event].push(callback);
      window.addEventListener(event, callback);
    }
  }

  public static removeListener(event: string): void {
    if (ListenerCollect.listeners[event]) {
      ListenerCollect.listeners[event].forEach((callback) => {
        window.removeEventListener(event, callback);
      });
      ListenerCollect.listeners[event] = [];
    }
  }

  public static removeSpecificListener(
    event: string,
    callback: EventListener,
  ): void {
    const index = ListenerCollect.listeners[event]?.indexOf(callback);
    if (index !== -1) {
      ListenerCollect.listeners[event].splice(index, 1);
      window.removeEventListener(event, callback);
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
) {
  const eventName = 'resize';
  ListenerCollect.addListener(eventName, callback);
  if (immediately) {
    window.dispatchEvent(new Event(eventName));
  }
}

export function destoryWindowResizeListener(callback: EventListener) {
  ListenerCollect.removeSpecificListener('resize', callback);
}

export function clearAllListeners() {
  ListenerCollect.clearAllListeners();
}
