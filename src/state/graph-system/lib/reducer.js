import { SET_ENDPOINT, SET_ENDPOINTS } from "./types";
const reducerActions = (state, action) => {
  const { type, payload, key } = action;
  switch (type) {
    case SET_ENDPOINT:
      return {
        ...state,
        endpoints: [...state.endpoints, action.payload],
      };
    case SET_ENDPOINTS:
      return {
        ...state,
        endpoints: action.payload,
      };

    default:
      return state;
  }
};

export default reducerActions;
