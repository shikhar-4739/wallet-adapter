import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Airdrop from "./components/Airdrop";
import Balance from "./components/Balance";
import Transfer from "./components/Transfer";
import SignMessage from "./components/SignMessage";
import Footer from "./components/Footer";


function WalletContent() {
  const { connected } = useWallet();

  return (
    <>
      <div className="flex lg:flex-row sm:flex-col justify-center mt-5 gap-2">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>

      <div className="relative">
        <div>
          <Tabs defaultValue="airdrop" className="mt-10">
            <TabsList className="flex flex-wrap gap-2 w-full">
              <TabsTrigger value="airdrop" className="flex-1 text-center">
                Airdrop
              </TabsTrigger>
              <TabsTrigger value="balance" className="flex-1 text-center">
                Balance
              </TabsTrigger>
              <TabsTrigger value="transfer" className="flex-1 text-center">
                Transfer
              </TabsTrigger>
              <TabsTrigger value="sign" className="flex-1 text-center">
                Sign
              </TabsTrigger>
            </TabsList>

            <div className={`${!connected ? "blur pointer-events-none opacity-60" : ""} transition-all duration-500 relative`}>
              <TabsContent value="airdrop">
                <Airdrop />
              </TabsContent>
              <TabsContent value="balance">
                <Balance />
              </TabsContent>
              <TabsContent value="transfer">
                <Transfer />
              </TabsContent>
              <TabsContent value="sign">
                <SignMessage />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {!connected && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white z-10">
            <p className="text-3xl">
              Please connect your wallet to access the features.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function App() {
  return (
    
    <div className="mx-auto min-h-screen" style={{ maxWidth: "800px" }}>
      <Navbar />

      <h1 className="lg:text-7xl text-4xl text-center mt-5">
        All-in-One Solana App:{" "}
      </h1>
      <p className="text-center lg:text-4xl text-2xl ml-4 mt-5">
        Airdrop Tokens, Transfer, and Check Balances
      </p>

      <ConnectionProvider endpoint={"https://devnet.helius-rpc.com/?api-key=a2335b29-e093-478d-bacf-dc1afa44120d"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <WalletContent />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

      <Footer />
    </div>
  );
}

export default App;
