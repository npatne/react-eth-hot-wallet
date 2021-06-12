import { FaEthereum } from "react-icons/fa";
import { BsChevronDown, BsPlus, BsDash } from "react-icons/bs";

function App() {
  return (
    <main className="section">
      <section className="container">
        <header>
          <FaEthereum className="icon active" />
          <h3>@{"main-net"}</h3>
          <select name="account" value={"bla"}>
            <option value="bla">BLA</option>
            <option value="blah">BLAH</option>
          </select>
        </header>
        <article className="balance-container">
          <h2>BALANCE</h2>
          <div className="balance">{"123.443468"}</div>
        </article>
        <article className="action-container">
          <p className="success showi"> 343 wei recieved</p>
          <p className="warning showi"> 343 wei sent</p>
          <p className="danger showi">{"error message"}</p>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-control">
              <label htmlFor="amount">Amount in Wei</label>
              <input
                type="text"
                placeholder="enter amount here"
                name="amount"
                id="amount"
                value={""}
                onChange={() => {}}
              />
            </div>
            <div className="form-control">
              <label htmlFor="to">Send to</label>
              <input
                type="text"
                placeholder="enter address here"
                name="address"
                id="to"
                value={""}
                onChange={() => {}}
              />
            </div>
            <button type="button" onClick={() => {}}>
              Send
            </button>
            <p
              className="copy-to-clip"
              onClick={() => {
                navigator.clipboard.writeText("account address");
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
              <button type="button" className="toggle-btn close">
                <BsChevronDown />
              </button>
            </div>
            <div className="transactions show-transactions">
              <div className="transaction">
                <div className="indicator">
                  {false ? (
                    <BsDash className="sent" />
                  ) : (
                    <BsPlus className="recieved" />
                  )}
                </div>
                <span>
                  {" "}
                  <strong>{"amt"}</strong> wei from <strong>{"xx1"}</strong> to{" "}
                  <strong>{"you"}</strong>
                </span>
              </div>

              <div className="transaction">
                <div className="indicator">
                  {true ? (
                    <BsDash className="sent" />
                  ) : (
                    <BsPlus className="recieved" />
                  )}
                </div>
                <span>
                  {" "}
                  <strong>{"amt"}</strong> wei from <strong>{"xx1"}</strong> to{" "}
                  <strong>{"you"}</strong>
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
