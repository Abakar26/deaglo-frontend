import { useEffect, useRef, useState } from "react";

interface ContainerOptions {
  showYAxis?: boolean;
  showXAxis?: boolean;
  withYLabel?: boolean;
}

export const useGraphContainer = ({
  showXAxis = true,
  showYAxis = true,
  withYLabel = false,
}: ContainerOptions = {}) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const ref = useRef<HTMLDivElement>(null);

  const widthOffset = (showYAxis ? 36 : 0) + (withYLabel ? 20 : 0);
  const heightOffset = showXAxis ? 32 : 0;

  useEffect(() => {
    const rso = new ResizeObserver(([div]) => {
      if (div) {
        setDimensions((current) => ({
          width: div.contentRect.width - widthOffset,
          height: current.height || div.contentRect.height - heightOffset,
        }));
      }
    });
    ref.current && rso.observe(ref.current);
    return () => {
      rso.disconnect();
    };
  }, [heightOffset, widthOffset]);

  return {
    ...dimensions,
    ref,
  };
};
