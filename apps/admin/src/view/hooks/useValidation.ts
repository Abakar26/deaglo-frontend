import { useState } from "react";
import { type ZodRawShape, type ZodObject, type ZodTypeAny, ZodError } from "zod";

export const useValidation = <T>(schema: ZodObject<ZodRawShape, "strip", ZodTypeAny, T>) => {
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const validate = (data: T, onValid: (data: T) => void) => {
    try {
      const _data = schema.parse(data);
      setErrors({});
      onValid(_data);
    } catch (error) {
      if (error instanceof ZodError) {
        const _errors = Object.entries(error.flatten().fieldErrors).reduce(
          (prev, [field, error]) => {
            return {
              ...prev,
              [field]: error?.at(0),
            };
          },
          {}
        );
        setErrors(_errors);
      }
    }
  };
  return {
    validate,
    errors,
  };
};
