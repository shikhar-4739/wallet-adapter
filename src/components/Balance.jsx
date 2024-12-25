import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GrMoney } from "react-icons/gr";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "react-toastify";

const Balance = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const[balance, setBalance] = useState(0);

  useEffect(()=>{
    async function getBalance() {
      if (wallet.publicKey) {
        toast.info("Loading Balance ...");
        const balance = await connection.getBalance(wallet.publicKey);
        const value = balance / LAMPORTS_PER_SOL;
        setBalance(value);
      }
    }
    getBalance();
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 text-xl">
          <span>Check your Balance</span>
          <GrMoney />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div id="balance" className="space-y-1">{balance} SOL</div>
      </CardContent>
    </Card>
  );
};

export default Balance;
