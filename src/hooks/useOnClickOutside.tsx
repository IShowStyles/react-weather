import { useEffect, useRef } from 'react';

type EventType = 'mousedown' | 'mouseup' | 'touchstart' | 'touchend';

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  eventType: EventType = 'mousedown',
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (!target || !(target instanceof Node) || !document.body.contains(target)) {
        return;
      }

      const isOutside = ref.current && !ref.current.contains(target);

      if (isOutside) {
        handler(event);
      }
    };

    document.addEventListener(eventType, listener);

    return () => {
      document.removeEventListener(eventType, listener);
    };
  }, [ref, handler, eventType]);

  return ref;
}
