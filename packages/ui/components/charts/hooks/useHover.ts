import { useEffect, useRef, useState } from "react";

export const useHover = <T extends SVGElement>(
  onPositionChange: (position: { x: number; y: number }) => void,
  onHoverChange: (hovering: boolean) => void,
  deps: Array<any>
) => {
  const ref = useRef<T>(null);

  const onMouseLeave = () => {
    onHoverChange(false);
  };

  const onMouseEnter = () => {
    onHoverChange(true);
  };

  const onMouseMove = (e: MouseEvent) => {
    onPositionChange({
      x: e.offsetX,
      y: e.offsetY,
    });
  };

  useEffect(() => {
    ref.current?.addEventListener("mousemove", onMouseMove);
    ref.current?.addEventListener("mouseleave", onMouseLeave);
    ref.current?.addEventListener("mouseenter", onMouseEnter);
    return () => {
      ref.current?.removeEventListener("mousemove", onMouseMove);
      ref.current?.removeEventListener("mouseleave", onMouseLeave);
      ref.current?.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [ref.current, ...deps]);

  return ref;
};
