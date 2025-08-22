"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function signUp() {
  const router=useRouter();
  const [user, setUser] = useState({ email: "", username: "", password: "" });

  const [buttonDisabled, setButtonDisabled ]= useState(false);
  const [loading , setLoading ]=useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/signup", user);
      console.log("SignUp successful:", response.data);
      router.push("/login");
    } catch (error: any) {
      console.error("signUp failed:", error);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };


  useEffect(()=>{
    if(user.email.length>0 && user.username.length>0 && user.password.length>0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  },[user])

  return (
    <div className="bg-black text-white flex justify-center items-center flex-col h-screen w-screen">
      <h1 className="text-3xl font-bold mb-4">{loading ? "processing...." : "signUp"}</h1>


      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="bg-amber-50 text-black border-2 border-gray-500 rounded-md p-2"
        placeholder="Enter your email here..."
      />
      <label htmlFor="username">username:</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="bg-amber-50 text-black border-2 border-gray-500 rounded-md p-2"
        placeholder="Enter your email here..."
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="bg-amber-50 text-black border-2 border-gray-500 rounded-md p-2"
        placeholder="Enter your password here..."
      />

      <button onClick={handleSubmit} className="bg-green-400 mt-4 p-2 rounded-md">
        {buttonDisabled ? "No signup" : "SignUp"}
      </button>
    </div>
  );
}
