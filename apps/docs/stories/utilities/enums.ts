type Enum<E> = Record<keyof E, number | string> & Record<number, string>;

export const createEnumOptions = <E>(enumeration: Enum<E>, isColor = false) => {
  const hexColorPattern = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

  return Object.keys(enumeration)
    .filter(
      (key) =>
        isNaN(Number(key)) &&
        (!isColor || (isColor && hexColorPattern.test(enumeration[key as keyof E] as string)))
    )
    .reduce(
      (acc, key) => {
        acc[key] = enumeration[key as keyof E];
        return acc;
      },
      {} as Record<string, unknown>
    );
};
