export const convertHarvestStringToList = (csvString: string) => {
  const lines = csvString.split("\n");
  lines.pop();
  const data: [string, string][] = lines.slice(1).map((line) => {
    const [, date, amount] = line.split(",");
    return [date ?? "", amount ?? ""];
  });

  return data;
};
