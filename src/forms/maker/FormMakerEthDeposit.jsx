import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { ETH } from "@makerdao/dai-plugin-mcd";

import { useMakerManager } from "../../constants/maker";

/**
 * @name FormMakerEthDeposit
 * @description Burn WETH and withdraw ETH
 * @version 0.0.1
 */

export const FormMakerEthDeposit = ({ cdpID, setSearchFilter, ...props }) => {
  // Component State
  const [proxy, proxySet] = useState(false);
  const [transaction, transactionSet] = useState();
  const [vault, vaultSet] = useState();
  const { handleSubmit, control, register } = useForm();

  // Contract
  const { maker, makerManager } = useMakerManager();
  useEffect(() => {
    if (makerManager && cdpID) {
      (async () => {
        const vault = await makerManager.getCdp(cdpID);
        vaultSet(vault);
      })();
    }
  }, [makerManager]);

  // Form
  const onSubmit = async (values) => {
    // const tx = await vault.lockAndDraw(ETH(2), DAI(20));
    if (vault) {
      console.log(vault, "vault");
      const tx = await vault.lockCollateral(ETH(values.amount));
      console.log(tx, "tx");
    }
  };
  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-default mt-3"
          name="amount"
          placeholder="Deposit Amount"
          ref={register({ required: true })}
        />

        <button className="btn-indigo w-36 mt-3">{props.label}</button>
      </form>
    </>
  );
};

FormMakerEthDeposit.defaultProps = {
  label: "Deposit",
  sx: {},
};

FormMakerEthDeposit.propTypes = {
  sx: PropTypes.object,
};

export default FormMakerEthDeposit;
