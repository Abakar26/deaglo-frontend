import { useEffect } from "react";

export const useSubscriber = (
  namespace: string,
  callback: (event: CustomEventInit) => void
): void => {
  useEffect(() => {
    window.addEventListener(`event_${namespace}`, (event: CustomEventInit) => callback(event));

    return () => {
      window.removeEventListener(namespace, callback);
    };
    // eslint-disable-next-line
  }, []);
};
