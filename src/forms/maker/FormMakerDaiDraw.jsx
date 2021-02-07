import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { DAI } from "@makerdao/dai-plugin-mcd";
import { useMakerManager } from "../../constants/maker";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
/**
 * @name FormMakerDaiDraw
 * @description Burn WETH and withdraw ETH
 * @version 0.0.1
 */

export const FormMakerDaiDraw = ({ cdpID, setSearchFilter, ...props }) => {
  // Component State
  const [transaction, transactionSet] = useState();
  const [vault, vaultSet] = useState();
  const { handleSubmit, register } = useForm();

  const transactionLifecycle = useContractTransactionLifecycle();
  console.log(transactionLifecycle, "transactionLifecycle");

  // Contract
  const { makerManager } = useMakerManager();
  useEffect(() => {
    if (makerManager && cdpID) {
      (async () => {
        const vault = await makerManager.getCdp(cdpID);
        transactionLifecycle.setMethod(vault.drawDai);
        vaultSet(vault);
      })();
    }
  }, [makerManager]);

  // Form
  const onSubmit = async (values) => {
    if (vault) {
      const tx = await vault.drawDai(DAI(values.withdraw));
      console.log(tx, "tx");
    }
  };
  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-default mt-3"
          name="withdraw"
          placeholder="Withdraw"
          ref={register({ required: true })}
        />
        <span className="text-sm text-gray-500">
          A minimum of 500 DAI must be withdrawn on initial draw.
        </span>

        <button className="btn-indigo w-36 mt-3">{props.label}</button>
      </form>
      {/* {transaction && (
        <TransactionModal isConnected={address} transaction={execute} />
      )} */}
    </>
  );
};

FormMakerDaiDraw.defaultProps = {
  label: "Withdraw",
  sx: {},
};

FormMakerDaiDraw.propTypes = {
  sx: PropTypes.object,
};

export default FormMakerDaiDraw;
