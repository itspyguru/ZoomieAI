"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";


export default function Home() {
  const { data: session } = authClient.useSession()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
    }, {
        onSuccess: () => {
            //redirect to the dashboard or sign in page
            alert("User created successfully! Please sign in.");
        },
        onError: () => {
            // display the error message
            alert("Error creating user. Please try again.");
        },
      }
    )
  }

  const onSignIn = () => {
    authClient.signIn.email({
      email,
      password,
    }, {
        onSuccess: () => {
            //redirect to the dashboard or home page
            alert("Signed in successfully!");
        },
        onError: () => {
            // display the error message
            alert("Error signing in. Please try again.");
        },
      }
    )
  }

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
        <p className="mt-2">You are logged in as {session.user.name}.</p>
        <Button onClick={() => authClient.signOut()} className="mt-4">
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex=col gap-y-10"> 
        <div className="p-4 flex flex-col gap-y-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <Button onClick={onSubmit} className="w-full">
          Create User
          </Button>
        </div>

        <div className="p-4 flex flex-col gap-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <Button onClick={onSignIn} className="w-full">
            Sign In
          </Button>
        </div>
    </div>
    
  );

  
}
