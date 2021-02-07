import { useMemo } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import stableCoins from "../../constants/stablecoins";
/**
 * @name FieldSelectStablecoinSimple
 * @param {Object} props
 */
export const FieldSelectStablecoinSimple = ({
  className,
  control,
  name,
  placeholder,
}) => {
  const [options] = useMemo(() => {
    let options = stableCoins.map((coin) => {
      return {
        value: coin.address,
        label: `${coin.name} (${coin.symbol})`,
      };
    });

    return [options];
  }, []);

  return (
    <Controller
      control={control}
      className={className}
      name={name}
      placeholder={placeholder}
      options={options}
      as={Select}
    />
  );
};

FieldSelectStablecoinSimple.defaultProps = {
  name: "token",
  placeholder: "Select Stablecoin",
};

export default FieldSelectStablecoinSimple;
