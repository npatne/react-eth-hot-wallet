const dummyTransactions = [
  {
    to: "xxxasd2",
    from: "xxxras1",
    amt: 3.55,
    timestamp: Math.floor(Date.now() / 1000) - 23,
  },
  {
    to: "xxxasd2",
    from: "xxxras1",
    amt: 0.6689,
    timestamp: Math.floor(Date.now() / 1000) + 23,
  },
  {
    to: "xxxras1",
    from: "xxxasd2",
    amt: 1.75,
    timestamp: Math.floor(Date.now() / 1000) + 445,
  },
];

const initialState = {
  accounts: [
    {
      address: "xxxras1",
      privateKey: "12345",
      publicKey: "12345",
      balance: 334.8765,
      transactions: [],
    },
    {
      address: "xxxasd2",
      privateKey: "12345",
      publicKey: "12345",
      balance: 123.4566,
      transactions: [],
    },
  ],

  currentAccount: {
    address: "xxxras1",
    privateKey: "12345",
    publicKey: "12345",
    balance: 334.8765,
    transactions: [],
  },
  error: { isError: false, msg: "not enough funds" },
  message: { show: false, type: "recieved", msg: "test msg" },
};

// actions
const SET_ACCOUNT = "SET_ACCOUNT";
const REMOVE_ERROR = "REMOVE_ERROR";
const REMOVE_MESSAGE = "REMOVE_MESSAGE";
const SET_TRANSACTION = "SET_TRANSACTION";
const SHOW_MESSAGE = "SHOW_MESSAGE";
export {
  initialState,
  SET_ACCOUNT,
  REMOVE_ERROR,
  REMOVE_MESSAGE,
  SET_TRANSACTION,
  SHOW_MESSAGE,
};
