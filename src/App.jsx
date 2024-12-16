import { ethers } from "ethers";
import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import contentImg1 from "./assets/content-1.svg";
import contentImg2 from "./assets/content-2.svg";
import contentImg3 from "./assets/content-3.svg";

function App() {
  const CONTRACT_ADDRESS = "0x5C4A180852d1d97F31040c539768A4525977A041";

  const CONTRACT_ABI = [
    {
      inputs: [
        { internalType: "uint256", name: "_campaignId", type: "uint256" },
      ],
      name: "donate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "campaignCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const [amount, setAmount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await web3Provider.send("eth_requestAccounts", []);
      const signer = await web3Provider.getSigner();

      setProvider(web3Provider);
      setContract(new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
      setAddress(accounts[0]);
      setConnected(true);

      toast.success("Wallet connected!");
    } else {
      window.ethereum.selectedAddress = null;
      setConnected(false);
      toast.error("Please install MetaMask!");
    }
  };

  const submit = () => {
    console.log(amount);
  };

  const openModal = () => {
    setAmount(0);
    document.getElementById("donate_modal").showModal();
  };

  return (
    <>
      <ToastContainer />
      <div className="container max-w-full">
        <div
          className="hero min-h-screen relative"
          style={{
            backgroundImage:
              "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
          }}
        >
          <div className="navbar bg-neutral bg-opacity-50 text-neutral-content absolute top-0">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Parent</a>
                    <ul className="p-2">
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a>Item 3</a>
                  </li>
                </ul>
              </div>
              <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <details>
                    <summary>Parent</summary>
                    <ul className="p-2">
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <div className="navbar-end">
              {address ? (
                <a className="btn rounded-full">{address}</a>
              ) : (
                <a className="btn rounded-full" onClick={connectWallet}>
                  Connect Wallet
                </a>
              )}
            </div>
          </div>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Web3 Charity</h1>
              <p className="mb-5">
                We want to make the most of Web3 technology, through this
                technology we also want to help others by sharing donations
              </p>
              <button className="btn btn-primary" onClick={() => openModal()}>
                Donate
              </button>
              <dialog id="donate_modal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg text-neutral ">Thank You</h3>
                  <form className="flex justify-center py-4" action="#">
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">
                          Enter the amount to be donated
                        </span>
                      </div>
                      <input
                        type="number"
                        placeholder="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        className="input input-bordered w-full max-w-xs text-neutral"
                      />
                    </label>
                  </form>
                  <div className="modal-action">
                    <button
                      className="btn bg-blue-600 text-white"
                      onClick={submit}
                    >
                      Send
                    </button>
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="w-full mb-5 bg-zinc-100 h-36 flex gap-5 p-3">
          <div className="card bg-zinc-300 text-zinc-400 w-1/4">
            <div className="card-body">
              <h2 className="card-title">Content 1</h2>
            </div>
          </div>
          <div className="card bg-zinc-300 text-zinc-400 w-1/4">
            <div className="card-body">
              <h2 className="card-title">Content 2</h2>
            </div>
          </div>
          <div className="card bg-zinc-300 text-zinc-400 w-1/4">
            <div className="card-body">
              <h2 className="card-title">Content 3</h2>
            </div>
          </div>
          <div className="card bg-zinc-300 text-zinc-400 w-1/4">
            <div className="card-body">
              <h2 className="card-title">Content 4</h2>
            </div>
          </div>
        </div>
        <div className="flex m-5 gap-5 justify-center">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img className="h-32" src={contentImg1} alt="Content 1" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Why We Exist</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img className="h-32" src={contentImg2} alt="Content 2" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Very Easy to Donate Via Blockchain Technology
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img className="h-32" src={contentImg3} alt="Content 3" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">See the Changes You Made</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>
        <footer className="footer bg-neutral text-neutral-content items-center p-4">
          <aside className="grid-flow-col items-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
          <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </nav>
        </footer>
      </div>
    </>
  );
}

export default App;
