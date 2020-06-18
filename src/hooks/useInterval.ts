import { useRef, useEffect } from "react";

export function useInterval(
  callback: () => void,
  delay: number,
  invokeRightAway: boolean = false
) {
  const savedCallback = useRef<() => void>(callback);
  const needToBeCalled = useRef<boolean>(true);

  useEffect(() => {
    savedCallback.current = callback;
    if (needToBeCalled.current && invokeRightAway) {
      needToBeCalled.current = false;
      savedCallback.current();
    }
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
