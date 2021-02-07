import { useEffect, useMemo, useState } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import Select from "react-select";

import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { useContractStableYield } from "../../hooks/useContractStableYield";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contractAddresses from "../../constants/contracts";
import stableCoins from "../../constants/stablecoins";
import curvePools from "../../constants/curvePools";

/**
 * @name FormStableYieldSwap
 * @description Burn WETH and withdraw ETH
 * @version 0.0.1
 */

export const FormStableYieldSwap = ({ cdpID, setSearchFilter, ...props }) => {
  // Component State
  const { account } = useWeb3React();
  const [tokenAddress, tokenAddressSet] = useState();
  const { handleSubmit, register, control, watch } = useForm();
  const { swapATokens } = useContractStableYield(contractAddresses.stableYield);
  const formValues = watch();

  const tokenContract = useContractERC20(
    "0x028171bCA77440897B824Ca71D1c56caC55b68A3" // aDAI
  );
  const allowance = tokenContract.allowance(
    contractAddresses.stableYield,
    account
  );

  console.log(swapATokens, "swapATokens");

  // console.log(allowance, "allowanceallowance");

  useEffect(() => {
    if (formValues && formValues.assetOut) {
      console.log(formValues.assetOut);
      tokenAddressSet(formValues.assetOut.value);
    }
  }, [formValues]);

  useEffect(() => {
    if (account) {
      (async () => {
        // console.log(allowance, "allowanceallowance");
      })();
    }
  }, [tokenContract]);

  const options = useMemo(() => {
    return stableCoins.map((coin) => {
      return {
        value: coin.address,
        label: `${coin.name} (${coin.symbol})`,
      };
    });
  }, []);

  const handleApproveToken = () => {
    const tx = tokenContract.approve.execute([
      contractAddresses.stableYield,
      transformDecimalsToWad(formValues.amountOut),
    ]);
  };

  // Form
  const onSubmit = async (values) => {
    if (values) {
      console.log(values, "values");
      swapATokens.execute([
        values.assetOut.value,
        transformDecimalsToWad(values.amountOut),
        values.assetIn.value,
        transformDecimalsToWad(values.amountIn, 6),
        "0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51",
        0,
        1,
        // "00000000000000000000000000000000000000000000000000000000000003a796356",
      ]);
    }
  };
  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          className={"w-full"}
          name="assetOut"
          control={control}
          defaultValue={options[0]}
          placeholder="Select Collateral"
          options={options}
          as={Select}
        />
        <input
          className="input-default mt-3"
          name="amountOut"
          placeholder="Send"
          ref={register({ required: true })}
        />
        <Controller
          className={"w-full mt-3"}
          name="assetIn"
          control={control}
          defaultValue={options[0]}
          placeholder="Select Collateral"
          options={options}
          as={Select}
        />
        <input
          className="input-default mt-3"
          name="amountIn"
          placeholder="Receieved"
          ref={register({ required: true })}
        />

        <button className="btn-indigo w-full mt-5">{props.label}</button>
        <button
          type="button"
          onClick={handleApproveToken}
          className="btn-green w-full mt-5"
        >
          Approve Token
        </button>
      </form>
      {/* {transaction && (
        <TransactionModal isConnected={address} transaction={execute} />
      )} */}
    </>
  );
};

FormStableYieldSwap.defaultProps = {
  label: "Exchange",
  sx: {},
};

FormStableYieldSwap.propTypes = {
  sx: PropTypes.object,
};

export default FormStableYieldSwap;
