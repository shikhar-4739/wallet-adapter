import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoMdSend } from "react-icons/io";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Buffer } from "buffer";
import { toast } from "react-toastify";

window.Buffer = window.Buffer || Buffer;
const Transfer = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const[amount, setAmount] = useState(0);
    const[address, setAddress] = useState("");

    async function sendTokens() {
        try {
          const transaction = new Transaction();
          if(address === "") {
            toast.error("Please enter a valid address!");
            return;
          }
          if(amount <= 0) {
            toast.error("Please enter a valid amount!");
            return;
          }
          toast.info("Processing ...");
          transaction.add(
            SystemProgram.transfer({
              fromPubkey: wallet.publicKey,
              toPubkey: new PublicKey(address),
              lamports: amount * LAMPORTS_PER_SOL,
            })
          );
      
          const signature = await wallet.sendTransaction(transaction, connection);
          const latestBlockhash = await connection.getLatestBlockhash();
              await connection.confirmTransaction({
                  signature,
                  blockhash: latestBlockhash.blockhash,
                  lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
              }, "confirmed");
      
          toast.success("Sent " + amount + " SOL to " + address);
          setAddress("");
          setAmount(0);
        } catch (error) {
          toast.error("Failed to send! Try again later.");
        }
    }

    const handleAddress = (e) => {
      setAddress(e.target.value);
    }

    const handleAmount = (e) => {
      setAmount(e.target.value);
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Transfer</CardTitle>
        <CardDescription>Send Sol from one account to another.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="to">To</Label>
          <Input id="to" placeholder="Receiver Address" value={address} onChange={handleAddress}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amouont</Label>
          <Input id="amount-value" placeholder="Enter Amount" value={amount > 0 ? amount : ""} onChange={handleAmount}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={sendTokens}>
          Send <IoMdSend />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Transfer;
