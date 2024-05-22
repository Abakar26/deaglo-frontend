import React, { useEffect, useState } from "react";
import { NumberInputType, TableInput, type TableInputProps } from "..";

interface TableNumberProps extends Omit<TableInputProps, "value" | "onChange"> {
  type?: NumberInputType;
  value?: number;
  onChange: (value?: number) => void;
  formatter?: (value: number) => string;
}

export const TableNumber: React.FunctionComponent<TableNumberProps> = ({
  type = NumberInputType.REAL,
  value,
  onChange,
  formatter,
  ...props
}) => {
  const [intermediary, setIntermediary] = useState(String(value ?? ""));

  useEffect(() => {
    setIntermediary(value !== undefined && formatter ? formatter(value) : `${value ?? ""}`);
  }, [value, formatter]);

  const validator = (value: string): [boolean, number] => {
    switch (type) {
      case NumberInputType.REAL:
        return [!!value.match(/^([-])?([0-9]{1,})?(\.)?([0-9]{1,})?$/), parseFloat(value)];
      case NumberInputType.INTEGER:
        return [!!value.match(/^([-])?([0-9]{1,})?$/), parseInt(value)];
      case NumberInputType.NATURAL:
        return [!!value.match(/^([0-9]{1,})?$/), parseInt(value)];
    }
  };

  const handleChange = (value: string) => {
    const unformattedValue = value.replace(/,/g, "");
    const [valid, numerical] = validator(unformattedValue);
    if (valid || !unformattedValue) {
      setIntermediary(unformattedValue);
      if (`${numerical}` === unformattedValue && !isNaN(numerical)) {
        onChange(numerical);
      } else if (!unformattedValue) {
        onChange(undefined);
      }
    }
  };

  return <TableInput {...props} value={intermediary} onChange={handleChange} />;
};
