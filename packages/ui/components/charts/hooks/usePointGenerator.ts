export const usePointGenerator = (points: number, f: (x: number) => number) => {
  return (start: number, stop: number): Array<[number, number]> => {
    return Array(Math.ceil(points))
      .fill(null)
      .map((_, index) => {
        const x = (index * (stop - start)) / points + start;
        return [x, f(x)];
      });
  };
};
