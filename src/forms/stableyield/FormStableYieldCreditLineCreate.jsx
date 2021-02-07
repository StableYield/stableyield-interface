import { useEffect, useMemo, useState } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import Select from "react-select";

import { useContractCreditLineFactory } from "../../hooks/stableyield/useContractCreditLineFactory";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contracts from "../../constants/contracts";
import idx from "idx";

/**
 * @name FormStableYieldCreditLineCreate
 * @description Burn WETH and withdraw ETH
 * @version 0.0.1
 */

export const FormStableYieldCreditLineCreate = ({
  cdpID,
  setSearchFilter,
  ...props
}) => {
  // Component State
  const { account } = useWeb3React();
  const [tokenAddress, tokenAddressSet] = useState();
  const { handleSubmit, register, control, watch } = useForm();
  const {
    createCreditLineERC20,
    createCreditLineERC721,
  } = useContractCreditLineFactory(contracts.stableYieldCreditLineFactory);
  const formValues = watch();

  // Form
  const onSubmit = async (values) => {
    console.log(values, "values");
    if (values) {
      if (idx(values, (_) => _.creditLineType.value) == "erc20") {
        createCreditLineERC20.execute({
          inputs: [
            values.borrower,
            values.assetToDeposit,
            transformDecimalsToWad(values.amountToDeposit),
            values.assetToBorrow,
            transformDecimalsToWad(values.amountToBorrow),
            values.interestRateMode.value,
            values.creditLineLength,
            values.creditLineTimelineType.value,
          ],
        });
      }
      if (idx(values, (_) => _.creditLineType.value) == "erc721") {
        console.log("erc721 credit line");
        createCreditLineERC721.execute({
          inputs: [
            values.borrower,
            values.assetToDeposit,
            values.collateralId,
            values.assetToBorrow,
            transformDecimalsToWad(values.amountToBorrow),
            values.interestRateMode.value,
            values.creditLineLength,
            values.creditLineTimelineType.value,
          ],
        });
      }
    }
  };
  return useMemo(() => {
    return (
      <>
        <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            className={"w-full"}
            name="creditLineType"
            control={control}
            placeholder="Select Collateral"
            options={[
              {
                value: "erc20",
                label: "ERC20 Collateral",
              },
              {
                value: "erc721",
                label: "ERC721 Collateral",
              },
            ]}
            as={Select}
          />
          {idx(formValues, (_) => _.creditLineType.value) == "erc20" && (
            <ERC20Collateral register={register} control={control} />
          )}
          {idx(formValues, (_) => _.creditLineType.value) == "erc721" && (
            <ERC721Collateral register={register} control={control} />
          )}
          <button className="btn-indigo w-full mt-5">{props.label}</button>
        </form>
        {/* {transaction && (
          <TransactionModal isConnected={address} transaction={execute} />
        )} */}
      </>
    );
  }, [formValues.creditLineType]);
};

const ERC20Collateral = ({ register, control }) => {
  return (
    <>
      <input
        className="input-default mt-3"
        name="borrower"
        placeholder="Borrower"
        ref={register({ required: true })}
      />
      <input
        className="input-default mt-3"
        name="assetToDeposit"
        placeholder="Asset to Deposit Address"
        ref={register({ required: true })}
      />
      <input
        className="input-default mt-3"
        name="amountToDeposit"
        placeholder="Amount to Deposit"
        ref={register({ required: true })}
      />
      <input
        className="input-default mt-3"
        name="assetToBorrow"
        placeholder="Asset to Borrow Address"
        ref={register({ required: true })}
      />
      <input
        className="input-default mt-3"
        name="amountToBorrow"
        placeholder="Amount to Borrow"
        ref={register({ required: true })}
      />
      <Controller
        as={Select}
        className={"w-full mt-3"}
        name="interestRateMode"
        control={control}
        placeholder="Interest Rate Mode"
        options={[
          {
            value: 1,
            label: "Stable Rate",
          },
          {
            value: 2,
            label: "Variable Rate",
          },
        ]}
        ref={register({ required: true })}
      />
      <input
        className="input-default mt-3"
        name="creditLineLength"
        placeholder="Length of Credit Loan"
        ref={register({ required: true })}
      />
      <Controller
        as={Select}
        className={"w-full mt-3"}
        name="creditLineTimelineType"
        control={control}
        placeholder="Timeline Type"
        options={[
          {
            value: 1,
            label: "Borrow",
          },
          {
            value: 2,
            label: "Activate",
          },
          {
            value: 3,
            label: "Timestamp",
          },
        ]}
        ref={register({ required: true })}
      />
    </>
  );
};

const ERC721Collateral = ({ register, control }) => {
  return (
    <>
      <input
        className="input-default mt-3"
        name="borrower"
        placeholder="Borrower"
        ref={register({ required: true })}
      />
      <input
        className="input-default mt-3"
        name="assetToDeposit"
        placeholder="Asset to Deposit Address"
        ref={register({ required: true })}
      />
      <input
        className="input-default mt-3"
        name="collateralId"
        placeholder="Collectible ID (e.x. 5)"
        ref={register({ required: true })}
      />
      <input
        className="input-default mt-3"
        name="assetToBorrow"
        placeholder="Asset to Borrow Address"
        ref={register({ required: true })}
      />
      <input
        className="input-default mt-3"
        name="amountToBorrow"
        placeholder="Amount to Borrow"
        ref={register({ required: true })}
      />
      <Controller
        as={Select}
        className={"w-full mt-3"}
        name="interestRateMode"
        control={control}
        placeholder="Interest Rate Mode"
        options={[
          {
            value: 1,
            label: "Stable Rate",
          },
          {
            value: 2,
            label: "Variable Rate",
          },
        ]}
        ref={register({ required: true })}
      />
      <input
        className="input-default mt-3"
        name="creditLineLength"
        placeholder="Length of Credit Loan"
        ref={register({ required: true })}
      />
      <Controller
        as={Select}
        className={"w-full mt-3"}
        name="creditLineTimelineType"
        control={control}
        placeholder="Timeline Type"
        options={[
          {
            value: 1,
            label: "Borrow",
          },
          {
            value: 2,
            label: "Activate",
          },
          {
            value: 3,
            label: "Timestamp",
          },
        ]}
        ref={register({ required: true })}
      />
    </>
  );
};

FormStableYieldCreditLineCreate.defaultProps = {
  label: "Request Credit Line",
  sx: {},
};

FormStableYieldCreditLineCreate.propTypes = {
  sx: PropTypes.object,
};

export default FormStableYieldCreditLineCreate;
