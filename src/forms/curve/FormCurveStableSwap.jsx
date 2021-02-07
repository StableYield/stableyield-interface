import { useEffect, useMemo, useState } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import Select from "react-select";

import { useContractCurveStableSwap } from "../../hooks/useContractCurveStableSwap";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import { ERC20UnlockTransferFrom, TransactionModal } from "../../components";
import curvePools from "../../constants/curvePools";
import { utils } from "ethers";
import idx from "idx";

/**
 * @name FormCurveStableSwap
 * @description Burn WETH and withdraw ETH
 * @version 0.0.1
 */

export const FormCurveStableSwap = ({ ...props }) => {
  // Component State
  const { handleSubmit, register, control, watch } = useForm();
  const { exchange_underlying } = useContractCurveStableSwap(
    "0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27"
  );
  const formValues = watch();

  const options = useMemo(() => {
    return curvePools["0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27"].tokens.map(
      (coin) => {
        return {
          value: coin.address,
          address: coin.address,
          decimals: coin.decimals,
          test: coin.address,
          label: `${coin.name} (${coin.symbol})`,
        };
      }
    );
  }, []);

  // Form
  const onSubmit = async (values) => {
    if (values) {
      exchange_underlying.execute({
        inputs: [
          values.assetOut.value,
          values.assetIn.value,
          transformDecimalsToWad(values.amountOut, values.assetOut.decimals),
          transformDecimalsToWad(values.amountIn, values.assetIn.decimals),
        ],
        name: `curve-exchange-${utils.getAddress(
          values.assetOut.address
        )}-${utils.getAddress(values.assetIn.address)}`,
      });
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
        <div className="mt-3">
          <ERC20UnlockTransferFrom
            address={idx(formValues, (_) => _.assetOut.address)}
            allowanceOf={
              curvePools["0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27"].address
            }
          >
            <button className="btn-indigo w-full">{props.label}</button>
          </ERC20UnlockTransferFrom>
        </div>
      </form>
      <TransactionModal transaction={exchange_underlying} />
    </>
  );
};

FormCurveStableSwap.defaultProps = {
  label: "Exchange",
  sx: {},
};

FormCurveStableSwap.propTypes = {
  sx: PropTypes.object,
};

export default FormCurveStableSwap;
