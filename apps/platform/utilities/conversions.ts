// Formats a number to general accounting form
export function toAccountingFormat(num: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

// Converts a decimal fraction to its equivalent percentage representation
export function fractionToPercentage(fraction: number): string {
  return (fraction * 100).toFixed(0) + "%";
}

// Abbreviates a large number by adding appropriate suffixes such as M for million, B for billion
export function abbreviateNumber(num: number): string {
  const abbreviations = {
    T: 1e12,
    B: 1e9,
    M: 1e6,
    K: 1e3,
  };

  const absNumber = Math.abs(num);

  for (const key in abbreviations) {
    const value = abbreviations[key as keyof typeof abbreviations];
    if (absNumber >= value) {
      return (
        new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 0,
          maximumFractionDigits: absNumber > 1e3 ? 1 : 0,
        }).format(num / value) + key
      );
    }
  }

  // If the number is smaller than 1 thousand, format without abbreviation
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}
