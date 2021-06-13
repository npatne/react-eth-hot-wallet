import {
  REMOVE_ERROR,
  REMOVE_MESSAGE,
  SET_ACCOUNT,
  SET_TRANSACTION,
  SHOW_MESSAGE,
} from "./constants";

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case SET_ACCOUNT:
      const currentAccount = state.accounts.find(
        (item) => item.address === action.payload
      );
      return { ...state, currentAccount };

    case SET_TRANSACTION:
      return {
        ...state,
        currentAccount: {
          ...state.currentAccount,
          balance: state.currentAccount.balance - action.payload.amt,
          transactions: [action.payload, ...state.currentAccount.transactions],
        },
      };

    case REMOVE_ERROR:
      return { ...state, error: { isError: false, msg: "no error" } };
    case REMOVE_MESSAGE:
      return { ...state, message: { ...state.message, show: false } };
    case SHOW_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default reducer;
