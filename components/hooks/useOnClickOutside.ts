import { useEffect, useCallback } from 'react';

// Вспомогатель клика вне элемента (ref'a)
export default function useOnClickOutside(ref: any, handler: any) {
  useEffect(
    useCallback(() => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]),

    [ref, handler]
  );
}
