export const usePublisher = <T = unknown>(namespace?: string): ((detail: T) => void) => {
  const publisher = (detail: T) => {
    window.dispatchEvent(
      new CustomEvent(`event_${namespace}`, {
        detail,
      })
    );
  };

  return publisher;
};
