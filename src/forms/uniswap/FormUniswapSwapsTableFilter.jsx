/* --- Global --- */
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { DateTime } from "luxon";
import styles from "./FormUniswapSwapsTableFilter.module.css";
import { useWeb3React } from "@web3-react/core";

/**
 * @name FormUniswapSwapsTableFilter
 * @description
 * @version 0.0.1
 */

export const FormUniswapSwapsTableFilter = ({ setSearchFilter, ...props }) => {
  const { handleSubmit, register, watch, setValue, errors, reset } = useForm();
  const { account } = useWeb3React();

  const onSubmit = (values) => {
    setSearchFilter({
      first: 5,
      where: {
        to: values.to || undefined,
        amountUSD_gte: values.amountUSDMin || undefined,
        amountUSD_lte: values.amountUSDMax || undefined,
        timestamp_lte: values.dateEnd
          ? `${DateTime.fromISO(values.dateEnd).toSeconds()}`
          : undefined,
        timestamp_gte: values.dateStart
          ? `${DateTime.fromISO(values.dateStart).toSeconds()}`
          : undefined,
      },
    });
  };

  const setActiveAccountAsTo = () => {
    setValue("to", account);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputHorizonal}>
        <label className={styles.labelBlank}>Receiver</label>
        <span
          className={styles.setActiveAccount}
          onClick={setActiveAccountAsTo}
        >
          Set Account Address
        </span>
      </div>
      <input
        name="to"
        placeholder="Receiver"
        ref={register({ required: false })}
        errors={errors}
      />
      <label className={styles.label}>Amount Sent</label>
      <div className={styles.inputHorizonal}>
        <input
          name="sentMin"
          placeholder="Amount Sent (Minumum)"
          ref={register({ required: false })}
          errors={errors}
        />
        <input
          name="sentMax"
          placeholder="Amount Sent (Max)"
          ref={register({ required: false })}
          errors={errors}
        />
      </div>
      <label className={styles.label}>Amount Received</label>
      <div className={styles.inputHorizonal}>
        <input
          name="receivedMin"
          placeholder="Amount Received (Minumum)"
          ref={register({ required: false })}
          errors={errors}
        />
        <input
          name="receivedMax"
          placeholder="Amount Received (Max)"
          ref={register({ required: false })}
          errors={errors}
        />
      </div>
      <label className={styles.label}>Total Value</label>
      <div className={styles.inputHorizonal}>
        <input
          name="amountUSDMin"
          placeholder="USD Value (Minumum)"
          ref={register({ required: false })}
          errors={errors}
        />
        <input
          name="amountUSDMax"
          placeholder="USD Value (Max)"
          ref={register({ required: false })}
          errors={errors}
        />
      </div>
      <label className={styles.label}>Date Start</label>
      <input
        name="dateStart"
        type="date"
        ref={register({ required: false })}
        errors={errors}
      />
      <label className={styles.label}>Date Start</label>
      <input
        name="dateEnd"
        type="date"
        ref={register({ required: false })}
        errors={errors}
      />
      <button
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
  );
};

FormUniswapSwapsTableFilter.defaultProps = {
  label: "Search",
  sx: {},
};

FormUniswapSwapsTableFilter.propTypes = {
  sx: PropTypes.object,
};

export default FormUniswapSwapsTableFilter;
