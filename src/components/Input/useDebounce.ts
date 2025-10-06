import { useRef, useEffect } from "react";

export function useDebounce<T extends (...args: unknown[]) => void>(
  callbackFn: T,
  delay: number,
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentArgsRef = useRef<Parameters<T>>([] as unknown as Parameters<T>);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debounceFn = (...args: Parameters<T>) => {
    currentArgsRef.current = args;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackFn(...currentArgsRef.current);
      timeoutRef.current = null;
    }, delay);
  };

  const resetDebounce = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const clearDebounce = () => {
    resetDebounce();
    callbackFn(...currentArgsRef.current);
  };

  return { debounceFn, resetDebounce, clearDebounce };
}
