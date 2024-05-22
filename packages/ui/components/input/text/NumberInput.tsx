import React, { useEffect, useState } from "react";
import { TextInput, type TooltipProps } from "../../../components";

export enum NumberInputType {
  REAL,
  INTEGER,
  NATURAL,
}

interface Props {
  name?: string;
  onChange: (value?: number) => void;
  label?: string;
  placeholder?: string;
  type?: NumberInputType;
  value?: number;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  tooltip?: TooltipProps;
  disabled?: boolean;
  formatter?: (value: number) => string;
  unitLabel?: string;
}

export const NumberInput: React.FunctionComponent<Props> = ({
  onChange,
  value,
  type = NumberInputType.REAL,
  formatter,
  ...props
}) => {
  const [intermediary, setIntermediary] = useState<string>(`${value ?? ""}`);

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

  return <TextInput {...props} onChange={handleChange} value={intermediary} />;
};
