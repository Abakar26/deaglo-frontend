import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(onClick: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickEvent = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
        onClick();
      }
    };
    document.addEventListener("mousedown", handleClickEvent);

    return () => {
      document.removeEventListener("mousedown", handleClickEvent);
    };
  }, [ref, onClick]);

  return ref;
};
