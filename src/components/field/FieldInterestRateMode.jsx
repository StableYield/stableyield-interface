import { useMemo } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

/**
 * @name
 * @param {Object} props
 */
export const FieldInterestRateMode = ({ control, className }) => {
  return (
    <Controller
      control={control}
      className={className}
      name="interestRateMode"
      placeholder="Select Interest Rate Mode"
      options={[
        {
          value: 1,
          label: "Stable Mode",
        },
        {
          value: 2,
          label: "Variable Mode",
        },
      ]}
      as={Select}
    />
  );
};
export default FieldInterestRateMode;
