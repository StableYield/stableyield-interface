import {
  SET_TOKEN_LIST,
  SET_BLOCKNUMBER_SYNC,
  SET_NONCE_SYNC,
  SET_WALLET_TYPE,
  SET_MAKER_VAULT_COUNT,
  SET_TRANSACTION_WATCH,
  UPDATE_TRANSACTION_WATCH,
  RESET_TRANSACTION_WATCH,
} from "./types";
const reducerActions = (state, action) => {
  switch (action.type) {
    case SET_BLOCKNUMBER_SYNC:
      return {
        ...state,
        lastBlockSync: action.payload,
      };
    case SET_NONCE_SYNC:
      return {
        ...state,
        lastNonceSync: action.payload,
      };
    case SET_TOKEN_LIST:
      return {
        ...state,
        tokenList: action.payload,
      };
    case SET_WALLET_TYPE:
      return {
        ...state,
        walletType: action.payload,
      };
    // Transaction Watch
    case SET_TRANSACTION_WATCH:
      return {
        ...state,
        transaction: action.payload,
      };
    case UPDATE_TRANSACTION_WATCH:
      return {
        ...state,
        transaction: {
          ...state.transaction,
          ...action.payload,
        },
      };
    case RESET_TRANSACTION_WATCH:
      return {
        ...state,
        transaction: undefined,
      };
    // MakerDAO
    case SET_MAKER_VAULT_COUNT:
      return {
        ...state,
        makerVaults: action.payload,
      };

    default:
      return state;
  }
};

export default reducerActions;
