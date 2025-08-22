"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function signUp() {
  const router=useRouter();

  const HandleLogOut= async()=>{
    try {
      const res=await axios.get("/api/logout");
      toast.success("logout successfully!");
      router.push('/login');

    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
}
  
  return (
    <div className="bg-black text-white flex justify-center items-center flex-col h-screen w-screen">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <button onClick={HandleLogOut} className="p-4 bg-blue-500 text-blue-50 font-bold">
        LogOut
      </button>
      
    </div>
  );
}
