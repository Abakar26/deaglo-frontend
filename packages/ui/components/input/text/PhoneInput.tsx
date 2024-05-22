import { AsYouType, isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";
import React, { useEffect, useState } from "react";
import { TextInput, type TooltipProps } from "../../../components";

interface PhoneInputProps {
  name?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  value: string;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  tooltip?: TooltipProps;
  disabled?: boolean;
  unitLabel?: string;
}

export const PhoneInput: React.FunctionComponent<PhoneInputProps> = ({
  onChange,
  value,
  ...props
}) => {
  const [intermediary, setIntermediary] = useState<string>("");

  useEffect(() => {
    const formattedValue = new AsYouType("US").input(value);
    setIntermediary(formattedValue);
  }, [value]);

  const handleChange = (value: string) => {
    if (!value.startsWith("+")) value = "+" + value;

    const asYouType = new AsYouType();
    const formattedValue = asYouType.input(value);
    setIntermediary(formattedValue);

    if (isValidPhoneNumber(value)) {
      const phoneNumber = parsePhoneNumberFromString(value);
      if (phoneNumber) {
        onChange(phoneNumber.number);
      }
    }
  };

  return <TextInput {...props} onChange={(value) => handleChange(value)} value={intermediary} />;
};
