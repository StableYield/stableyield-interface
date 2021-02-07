import useWeb3System from "../useContext";
import {
  SET_TRANSACTION_WATCH,
  UPDATE_TRANSACTION_WATCH,
  RESET_TRANSACTION_WATCH,
} from "../lib/types";
import { useMemo } from "react";

/**
 * @name useTransactionWatch
 * @description Manage latest transaction state in the Web3ReactSystem context.
 */
export const useTransactionWatch = () => {
  const { dispatch, transaction } = useWeb3System();

  /**
   * @name setTransactionWatch
   * @param {Object} tx
   * @description Set the latest transaction to global state.
   */
  const setTransaction = (transactionDetails) => {
    dispatch({
      type: SET_TRANSACTION_WATCH,
      payload: transactionDetails,
    });
  };

  /**
   * @name updateTransaction
   * @param {Object} tx
   * @description Set the latest transaction to global state.
   */
  const updateTransaction = (transactionDetails) => {
    dispatch({
      type: UPDATE_TRANSACTION_WATCH,
      payload: transactionDetails,
    });
  };

  /**
   * @name resetTransactWatch
   * @description Reset the latest transaction to undefined.
   */
  const resetTransact = () => {
    dispatch({
      type: RESET_TRANSACTION_WATCH,
    });
  };

  return useMemo(
    () => ({
      setTransaction,
      updateTransaction,
      resetTransact,
      transaction,
    }),
    [transaction]
  );
};
