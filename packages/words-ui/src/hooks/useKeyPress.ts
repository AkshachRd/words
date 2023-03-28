import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const isKeyboardEvent = (event: Event): event is KeyboardEvent => "key" in event;

export const useKeyPress = (keys: string[], callback: (event: KeyboardEvent) => void, node: Node | null = null) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // Handle what happens on key press
  const handleKeyPress = useCallback(
    (event: Event) => {
      if (!isKeyboardEvent(event)) {
        throw new Error("Not a keyboard event");
      }

      if (keys.includes(event.key)) {
        callbackRef.current(event);
      }
    },
    [keys]
  );

  useEffect(() => {
    const targetNode = node ?? document;
    targetNode.addEventListener("keydown", handleKeyPress);

    return () =>
      targetNode.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress, node]);
};