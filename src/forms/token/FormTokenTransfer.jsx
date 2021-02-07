/* --- Global --- */
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import styles from "./FormTokenTransfer.module.css";
import { useWeb3React } from "@web3-react/core";
import { useContractERC20 } from "../../hooks";
import { transformDecimalsToWad } from "../../state/web3-react-system/lib/helpers";
import { TransactionModal } from "../../components";

/**
 * @name FormTokenTransfer
 * @description
 * @version 0.0.1
 */

export const FormTokenTransfer = ({ setSearchFilter, ...props }) => {
  const { handleSubmit, register, watch, setValue, errors, reset } = useForm();
  const { account } = useWeb3React();
  const { transfer, decimals } = useContractERC20(
    process.env.NEXT_PUBLIC_TOKEN_ADDRESS
  );

  const onSubmit = async (values) => {
    const decimalAmount = await decimals();
    transfer.execute([
      values.to,
      transformDecimalsToWad(values.amount, decimalAmount),
    ]);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="Receiver"
          ref={register({ required: false })}
          errors={errors}
        />
        <input
          name="amount"
          placeholder="Amount"
          ref={register({ required: false })}
          errors={errors}
        />
        <button
          // disabled={!transfer}
          sx={{
            boxShadow: 2,
            borderRadius: "0 6px 6px 0",
            fontFamily: "gaming",
            fontWeight: 700,
            height: 55,
            fontSize: [2],
            textShadow: "2px 2px 3px rgba(0,0,0,0.2)",
            flex: 1,
            p: 3,
          }}
        >
          {props.label}
        </button>
        <span onClick={reset} className={styles.reset}>
          Reset Form
        </span>
      </form>
      <TransactionModal transaction={transfer} />
    </>
  );
};

FormTokenTransfer.defaultProps = {
  label: "Send Token",
  sx: {},
};

FormTokenTransfer.propTypes = {
  sx: PropTypes.object,
};

export default FormTokenTransfer;
