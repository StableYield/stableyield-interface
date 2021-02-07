/* --- Global --- */
import { useEffect, useReducer, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { useTransactionWatch } from "./useTransactionWatch";
import idx from "idx";

/**
 * @function useContractTransactionLifecycle
 * @description Dispatch, Broadcast and Confirm Ethereum tranasctions.
 */
const LIFECYLE_DEFAULT = "LIFECYLE_DEFAULT";
const LIFECYLE_TRANSACTION_REQUESTING = "LIFECYLE_TRANSACTION_REQUESTING";
const LIFECYLE_TRANSACTION_REJECTED = "LIFECYLE_TRANSACTION_REJECTED";
const LIFECYLE_TRANSACTION_BROADCAST = "LIFECYLE_TRANSACTION_BROADCAST";
const LIFECYLE_TRANSACTION_SUCCESS = "LIFECYLE_TRANSACTION_SUCCESS";
const LIFECYLE_TRANSACTION_FAILURE = "LIFECYLE_TRANSACTION_FAILURE";
/* --- Effect --- */
export const useContractTransactionLifecycle = (method) => {
  const transactionWatch = useTransactionWatch();
  const { library } = useWeb3React();

  /* --- Local : State --- */
  const initialState = useMemo(
    () => ({
      lifecyle: LIFECYLE_DEFAULT,
      method: method,
      transaction: undefined,
      inputs: undefined,
      hash: undefined,
      broadcast: undefined,
      receipt: undefined,
      // Error : States
      broadcastError: undefined,
      confirmedError: undefined,
      receiptStatus: undefined,
      // Booleans : States
      isReady: false,
      isRequesting: false,
      isBroadcast: false,
      isConfirmed: false,
      isError: false,
      isRejected: false,
    }),
    [method]
  );

  function reducer(state, action) {
    switch (action.type) {
      case "SET_METHOD":
        return {
          ...state,
          method: action.payload,
          isReady: true,
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.payload,
          isError: true,
          isActive: false,
          isRequesting: false,
          isBroadcast: false,
          isRejected: true,
          isConfirmed: false,
          isRejected: false,
          broadcastErrorCode: action.payload.errorCode,
          broadcastError: action.payload.error,
        };
      case "REQUESTING_SIGNATURE":
        return {
          ...state,
          transaction: undefined,
          inputs: undefined,
          hash: undefined,
          broadcast: undefined,
          broadcastError: undefined,
          broadcastErrorCode: undefined,
          receipt: undefined,
          // Error : States
          broadcastError: undefined,
          confirmedError: undefined,
          receiptStatus: undefined,

          // Booleans : States
          isActive: true,
          isBroadcast: false,
          isConfirmed: false,
          isError: false,
          isRejected: false,
          isRequesting: true,
          lifecyle: LIFECYLE_TRANSACTION_REQUESTING,
        };
      case "REJECTED_SIGNATURE":
        return {
          ...state,
          isActive: false,
          isRequesting: false,
          isRejected: true,
          lifecyle: LIFECYLE_TRANSACTION_REJECTED,
        };
      case "SET_BROADCAST_CONFIRMED":
        return {
          ...state,
          isBroadcast: true,
          isRequesting: false,
          hash: action.payload.hash,
          transaction: action.payload.transaction,
        };
      case "SET_BROADCAST_ERROR":
        return {
          ...state,
          isActive: false,
          isRequesting: false,
          broadcastErrorCode: action.payload.errorCode,
          broadcastError: action.payload.error,
          lifecyle: LIFECYLE_TRANSACTION_FAILURE,
        };
      case "SET_RECEIPT_SUCCESS":
        return {
          ...state,
          isActive: false,
          isRequesting: false,
          isConfirmed: true,
          receiptStatus: action.payload.receiptStatus,
          receipt: action.payload.receipt,
          lifecyle: LIFECYLE_TRANSACTION_SUCCESS,
        };

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * @name deploy
   * @param {Object} factory
   * @param {Array} inputs
   * @param {Object} params
   */
  const deploy = async (factory, inputs, params) => {
    try {
      dispatch({
        type: "REQUESTING_SIGNATURE",
        payload: transaction,
      });

      let transaction;
      if (!inputs && !params) {
        transaction = await factory.deploy();
      } else if (!params) {
        transaction = await state.deploy(...inputs);
      } else {
        transaction = await state.deploy(...inputs, params);
      }
      dispatch({
        type: "SET_BROADCAST_CONFIRMED",
        payload: {
          hash: transaction.deployTransaction.hash,
          transaction: transaction,
        },
      });
    } catch (error) {
      if (error.code == 4001) {
        dispatch({
          type: "REJECTED_SIGNATURE",
          payload: error,
        });
      } else {
        dispatch({
          type: "SET_BROADCAST_ERROR",
          payload: {
            errorCode: error.code,
            error: error,
          },
        });
      }
    }
  };

  /**
   * @name execute
   * @param {Array} inputs
   * @param {Object} params
   */
  const execute = async ({ inputs, params, name }) => {
    try {
      dispatch({
        type: "REQUESTING_SIGNATURE",
        payload: transaction,
      });

      if (name) {
        transactionWatch.setTransaction({
          name,
          status: "REQUESTING_SIGNATURE",
        });
      }

      let transaction;
      if (!inputs && !params) {
        transaction = await state.method();
      } else if (!params) {
        transaction = await state.method(...inputs);
      } else {
        transaction = await state.method(...inputs, params);
      }
      if (idx(transactionWatch, (_) => _.transaction.name)) {
        transactionWatch.updateTransaction({
          status: "BROADCASTING",
          transaction: transaction,
        });
      }
      dispatch({
        type: "SET_BROADCAST_CONFIRMED",
        payload: {
          hash: transaction.hash,
          transaction: transaction,
        },
      });
    } catch (error) {
      console.log(error, "bestRate[1]bestRate[1]");
      if (error.code == 4001) {
        dispatch({
          type: "REJECTED_SIGNATURE",
          payload: error,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: {
            errorCode: error.code,
            error: error,
          },
        });
      }
    }
  };

  const setMethod = (fnc) => {
    dispatch({
      type: "SET_METHOD",
      payload: fnc,
    });
  };

  useEffect(() => {
    if (method) {
      dispatch({
        type: "SET_METHOD",
        payload: method,
      });
    } else {
      dispatch({
        type: "SET_METHOD",
        payload: undefined,
      });
    }
  }, [method]);

  /* --- Wait for Transaction : Effect --- */
  useEffect(() => {
    if (state.transaction) {
      (async () => {
        try {
          const receipt = await library.waitForTransaction(state.hash);
          if (idx(transactionWatch, (_) => _.transaction.name)) {
            transactionWatch.updateTransaction({
              status: "CONFIRMED",
              receipt,
            });
          }
          dispatch({
            type: "SET_RECEIPT_SUCCESS",
            payload: {
              receipt: receipt,
              receiptStatus: receipt.status ? true : false,
            },
          });
        } catch (error) {
          console.log(error);
          if (idx(transactionWatch, (_) => _.transaction.name)) {
            transactionWatch.updateTransaction({
              status: "REJECTED",
              error,
            });
          }
          // setTransactionConfirmedError(error)
        }
      })();
    }
  }, [state.transaction]);

  return {
    lifecyle: state.lifecyle,
    hash: state.hash,
    broadcast: state.broadcast,
    broadcastError: state.broadcastError,
    broadcastErrorCode: state.broadcastErrorCode,
    receipt: state.receipt,
    receiptStatus: state.receiptStatus,
    confirmedError: state.confirmedError,
    transaction: state.transaction,
    isReady: state.isReady,
    isActive: state.isActive,
    isBroadcast: state.isBroadcast,
    isConfirmed: state.isConfirmed,
    isRejected: state.isRejected,
    isError: state.isError,
    isRequesting: state.isRequesting,
    method: state.method,
    setMethod: setMethod,
    deploy,
    execute,
  };
};
