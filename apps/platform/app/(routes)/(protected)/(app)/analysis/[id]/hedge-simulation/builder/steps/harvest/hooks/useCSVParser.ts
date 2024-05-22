import Papa from "papaparse";

export const useCSVParser = <T>() => {
  const parse = (file: File, completion: (data: Array<T>, errors: Array<string>) => void) => {
    Papa.parse<T>(file, {
      complete: ({ data, errors }) => {
        completion(
          data.slice(1),
          errors.map((error) => error.message)
        );
      },
      error: (error) => {
        completion([], [error.message]);
      },
      skipEmptyLines: true,
    });
  };

  return {
    parse,
  };
};
