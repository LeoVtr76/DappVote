import "./App.css"; // Importing the App.css file for styling
import { useState, useEffect } from "react"; // Importing the useState and useEffect hooks from React
import { ethers } from "ethers"; // Importing ethers library for interacting with Ethereum
import { Vote } from "./components/Vote"; // Importing the Store component
import Web3Voting from "./Web3Voting.json";
function App() {
  // Set initial state using the useState hook
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  // Set initial account state using the useState hook
  const [account, setAccount] = useState("Install Metamask extension");

  // Use the useEffect hook to connect to the wallet and get user account info
  useEffect(() => {
    const connectWallet = async () => {
      // Set the contract address and ABI
      //const contractAddress = "0xcE12550e0276fDc964a90590fEf0749B2e9C373c"; //Number contract
      const contractAddress = "0xebdC53057c6A16a8D819B332149bd3eD4b174bf6"; //Vote contract

      try {
        const { ethereum } = window;

        // Check if the user has a Web3-enabled browser extension (such as Metamask) installed
        if (ethereum) {
          // Get the user's account using the eth_requestAccounts method
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          // Reload the page if the user changes the Ethereum network
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          // Reload the page if the user changes accounts
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          // Create a provider object using the Web3Provider class
          const provider = new ethers.BrowserProvider(window.ethereum);
          // Get the signer object
          const signer = await provider.getSigner();
          // Create a contract object using the Contract class
          const contract = new ethers.Contract(
            contractAddress,
            Web3Voting.abi,
            signer
          );
          // Set the user account and state
          setAccount(account);
          setState({ provider, signer, contract });
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  // Log the state to the console
  console.log(state);

  // Render the components with user account information and state
  return (
    <div className="App">
      <header className="App-header">
        Votre compte actuel :{" "}
        <a href={`https://mumbai.polygonscan.com/address/${account[0]}`}>
          Voir le compte
        </a>
        <br />
        {state.contract ? (
          <Vote contract={state.contract} />
        ) : (
          "Loading contract..."
        )}
      </header>
    </div>
  );
}

// Export the App component
export default App;
