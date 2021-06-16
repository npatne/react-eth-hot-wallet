import { FaEthereum } from "react-icons/fa";
import { BsChevronDown, BsPlus, BsDash } from "react-icons/bs";
import { useReducer, useEffect, useState } from "react";
import reducer from "./reducer.js";
import { initialState } from "./constants.js";
import {
  SET_ACCOUNT,
  REMOVE_ERROR,
  REMOVE_MESSAGE,
  SET_TRANSACTION,
  SHOW_MESSAGE,
} from "./constants.js";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showTransactions, setShowTransactions] = useState(false);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (state.error.isError) {
      const timeout = setTimeout(() => {
        dispatch({ type: REMOVE_ERROR });
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state.error.isError]);

  useEffect(() => {
    if (state.message.show) {
      const timeout = setTimeout(() => {
        dispatch({ type: REMOVE_MESSAGE });
      }, 4000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state.message.show]);

  const validate = () => {
    return true;
  };

  const handleSend = () => {
    if (validate()) {
      dispatch({
        type: SET_TRANSACTION,
        payload: {
          from: state.currentAccount.address,
          to: address,
          amt: parseFloat(amount),
          timestamp: Math.floor(Date.now() / 1000),
        },
      });
      dispatch({
        type: SHOW_MESSAGE,
        payload: { show: true, type: "sent", msg: "eth sent successfully" },
      });
      setAmount("");
      setAddress("");
    }
  };

  return (
    <main className="section">
      <section className="container">
        <header>
          <FaEthereum className="icon active" />
          <h3>@{"main-net"}</h3>
          <select
            name="account"
            value={state.currentAccount.address}
            onChange={(event) => {
              dispatch({ type: SET_ACCOUNT, payload: event.target.value });
            }}
          >
            {state.accounts.map((account, index) => {
              return (
                <option key={index} value={account.address}>
                  {account.address}
                </option>
              );
            })}
          </select>
        </header>
        <article className="balance-container">
          <h2>
            BALANCE <small>(in eth)</small>
          </h2>
          <div className="balance">{state.currentAccount.balance}</div>
        </article>
        <article className="action-container">
          {state.message.show && (
            <p
              className={`${
                state.message.type === "recieved" ? "success" : "warning"
              } ${state.message.show ? "show" : ""}`}
            >
              {state.message.msg}
            </p>
          )}
          <p className={`danger ${state.error.isError ? "show" : ""}`}>
            {state.error.msg}
          </p>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-control">
              <label htmlFor="amount">Amount in eth</label>
              <input
                type="number"
                placeholder="enter amount here"
                name="amount"
                id="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <div className="form-control">
              <label htmlFor="to">Send to</label>
              <input
                type="text"
                placeholder="enter address here"
                name="address"
                id="to"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <p className="gas-fee-note">estimated gas fees: {"some amount"}</p>
            <button type="button" onClick={handleSend}>
              Send
            </button>
            <p
              className="copy-to-clip"
              onClick={() => {
                navigator.clipboard.writeText(state.currentAccount.address);
              }}
            >
              click here to copy your account address
            </p>
          </form>
          <div className="transaction-container">
            <div className="heading">
              <h2>
                <strong>Transactions</strong>
              </h2>
              <button
                type="button"
                className={`toggle-btn ${showTransactions ? "close" : ""}`}
                onClick={() => {
                  setShowTransactions(!showTransactions);
                }}
              >
                <BsChevronDown />
              </button>
            </div>
            <div
              className={`transactions ${
                showTransactions ? "show-transactions" : ""
              }`}
            >
              {state.currentAccount.transactions.map((item) => {
                const { to, from, timestamp, amt } = item;
                const _to =
                  to === state.currentAccount.address
                    ? "you"
                    : `X${to.slice(-4)}`;
                const _from =
                  from === state.currentAccount.address
                    ? "you"
                    : `X${from.slice(-4)}`;

                const indicator = _from === "you" ? true : false;

                return (
                  <div className="transaction" key={timestamp}>
                    <div className="indicator">
                      {indicator ? (
                        <BsDash className="sent" />
                      ) : (
                        <BsPlus className="recieved" />
                      )}
                    </div>
                    <span>
                      {" "}
                      <strong>{amt}</strong> eth from{" "}
                      <strong title={from}>{_from}</strong> to{" "}
                      <strong title={to}>{_to}</strong>
                    </span>
                    <span className="timestamp">
                      {true ? `TS_${timestamp}` : "processing.."}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
