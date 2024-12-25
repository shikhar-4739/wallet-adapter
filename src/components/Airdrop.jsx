import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LuCoins } from "react-icons/lu";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from 'react-toastify';

const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

      async function requestAirdrop() {
          try {
            let amount = 1;
            toast.info("Processing ...");
            await connection.requestAirdrop(
              wallet.publicKey,
              amount * LAMPORTS_PER_SOL
            );
            toast.success("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
          } catch (error) {
            toast.error("Failed to airdrop! Try again later.");
          }
        }

  return (
    <Card>
          <CardHeader>
            <CardTitle className="text-xl">Request Airdrop</CardTitle>
            <CardDescription>
              Max 1 SOL per request.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input id="amount" placeholder={wallet.publicKey} disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={requestAirdrop}><LuCoins />AirDrop</Button>
          </CardFooter>
        </Card>
  )
}

export default Airdrop
