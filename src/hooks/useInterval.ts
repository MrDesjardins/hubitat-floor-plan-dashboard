import { useRef, useEffect } from "Hooks/node_modules/react";

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback !== null) {
        savedCallback.current();
      }
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
