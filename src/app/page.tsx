"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";


export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
    }, {
        onRequest: () => {
            alert("Creating user...");
        },
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

  return (
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
  );
}
