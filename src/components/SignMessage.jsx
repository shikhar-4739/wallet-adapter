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
import { ed25519 } from "@noble/curves/ed25519";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { toast } from "react-toastify";

const SignMessage = () => {
  const { connection } = useConnection();
  const { publicKey, signMessage } = useWallet();
  const[message, setMessage] = useState("");

    async function Sign() {
        try {
          if (!publicKey) throw new Error('Wallet not connected!');
          if (!signMessage) throw new Error('Wallet does not support message signing!');
          
          toast.info("Processing ...");
          const encodedMessage = new TextEncoder().encode(message);
          const signature = await signMessage(encodedMessage);
  
          if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
          toast.success('success', `Message signature: ${bs58.encode(signature)}`);
          setMessage("");
        } catch (error) {
          toast.error("Failed to sign! Try again later.");
        }
    };


    const handleMessage = (e) => {
      setMessage(e.target.value);
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sign a Message</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Type your Message to be Signed</Label>
          <Input id="message" placeholder="Enter Message" value={message} onChange={handleMessage}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={Sign}>Sign Message</Button>
      </CardFooter>
      
    </Card>
  );
};

export default SignMessage;
