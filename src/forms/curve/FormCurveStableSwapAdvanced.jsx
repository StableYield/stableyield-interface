import idx from "idx";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { FieldSelectStablecoin } from "../../components";
import { useContractCurveExchangeRegistry } from "../../hooks";
import { useContractBaseCurveExchangeRegistry } from "../../hooks/useContractsBase";
import {
  transformDecimalsToWad,
  transformTokenToHuman,
  numberTrimDecimals,
  commifyTokenBalance,
} from "../../helpers/blockchain";
import {
  Address,
  ERC20UnlockTransferFrom,
  TransactionModal,
} from "../../components";
import contracts from "../../constants/contracts";
import { getStablecoinDecimals } from "../../helpers/stablecoins";

/**
 * @name FormCurveStableSwapAdvanced
 * @description Burn WETH and withdraw ETH
 * @version 0.0.1
 */
export const FormCurveStableSwapAdvanced = ({ ...props }) => {
  // Component State
  const { handleSubmit, register, control, watch, setValue } = useForm();
  const formValues = watch();
  console.log(formValues);

  // Smart Contracts
  const [exchangeDetails, exchangeDetailsSet] = useState();
  const [priceCalculated, priceCalculatedSet] = useState(false);
  const { exchange } = useContractCurveExchangeRegistry(
    contracts.curveExchangeRegistry
  );
  const curveBaseExchangeRegistry = useContractBaseCurveExchangeRegistry(
    contracts.curveExchangeRegistry
  );

  useEffect(() => {
    if (
      formValues.assetIn &&
      formValues.assetOut &&
      formValues.amountOut &&
      !priceCalculated
    ) {
      (async () => {
        const bestRate = await curveBaseExchangeRegistry.get_best_rate(
          formValues.assetOut,
          formValues.assetIn,
          transformDecimalsToWad(formValues.amountOut)
        );
        priceCalculatedSet(true);
        const assetOutDecimals = getStablecoinDecimals(formValues.assetOut);
        const assetInDecimals = getStablecoinDecimals(formValues.assetIn);

        console.log(
          formValues.assetIn,
          assetInDecimals,
          assetOutDecimals,
          "assetInDecimals"
        );
        exchangeDetailsSet({
          pool: bestRate[0],
          assetOut: formValues.assetOut,
          assetIn: formValues.assetIn,
          amountOut: transformDecimalsToWad(
            formValues.amountOut,
            assetOutDecimals
          ),
          amountIn: bestRate[1].sub(100000),
          amountOutDisplay: commifyTokenBalance(formValues.amountOut),
          amountInDisplay: transformTokenToHuman(
            bestRate[1].sub(1000000),
            assetInDecimals
          ),
        });

        // Update Form Values
        setValue(
          "amountIn",
          numberTrimDecimals(
            transformTokenToHuman(bestRate[1], assetInDecimals),
            5
          )
        );
      })();
    }
  }, [formValues]);

  // Form
  const onSubmit = async (values) => {
    if (values) {
      exchange.execute({
        inputs: [
          exchangeDetails.pool,
          exchangeDetails.assetOut,
          exchangeDetails.assetIn,
          exchangeDetails.amountOut,
          exchangeDetails.amountIn,
        ],
        // name: `curve-exchange-${utils.getAddress(
        //   values.assetOut
        // )}-${utils.getAddress(values.assetIn)}`,
      });
    }
  };
  return (
    <>
      <form className={"form-default w-full"} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between">
          <div className="flex flex-3">
            <div className="flex flex-1 h-full bg-white items-center w-full self-center p-6 py-8 rounded-md border-solid border-2 border-gray-200 hover:shadow-lg">
              <div className="flex-5">
                <FieldSelectStablecoin
                  register={register}
                  setValue={setValue}
                  name="assetOut"
                  value={formValues["assetOut"]}
                />
              </div>
              <div className="flex-5 ml-3 text-right">
                <input
                  onChange={() => priceCalculatedSet(false)}
                  className="input-defaults w-full text-right text-3xl focus:outline-none"
                  name="amountOut"
                  placeholder="0.00"
                  ref={register({ required: true })}
                />
                <label className="text-sm text-gray-400">Amount</label>
              </div>
            </div>
          </div>
          <div className="flex flex-3 mt-3">
            <div className="flex bg-white items-center w-full self-center p-6 py-8 rounded-md border-solid border-2 border-gray-200 hover:shadow-lg">
              <div className="flex-5">
                <FieldSelectStablecoin
                  register={register}
                  setValue={setValue}
                  name="assetIn"
                  value={formValues["assetIn"]}
                />
              </div>
              <div className="flex-5 ml-3 text-right">
                <input
                  className="input-defaults w-full text-right text-3xl focus:outline-none"
                  name="amountIn"
                  placeholder="0.00"
                  ref={register({ required: true })}
                />
                <label className="text-sm text-gray-400">Amount</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between my-3">
            <span className="text-gray-400 tag-white">Minimum Received</span>
            <span className="tag-green px-4 self-center">
              ${idx(exchangeDetails, (_) => _.amountInDisplay)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 tag-white">Liquidity Pool</span>
            <Address
              isLink
              className="tag-blue px-4 self-center"
              address={idx(exchangeDetails, (_) => _.pool)}
              trim={8}
            />
          </div>
        </div>
        <div className="mt-3 mx-auto w-full">
          <ERC20UnlockTransferFrom
            label="Enable Exchange"
            address={idx(formValues, (_) => _.assetOut)}
            allowanceOf={contracts.curveExchangeRegistry}
          >
            <button className="btn-indigo btn-lg gradient-yellow-to-pink w-full">
              {props.label}
            </button>
          </ERC20UnlockTransferFrom>
        </div>
      </form>
      {/* <TransactionModal tr
      ansaction={exchange_underlying} /> */}
    </>
  );
};

FormCurveStableSwapAdvanced.defaultProps = {
  label: "Exchange",
  sx: {},
};

FormCurveStableSwapAdvanced.propTypes = {
  sx: PropTypes.object,
};

export default FormCurveStableSwapAdvanced;
