"use client";
import React, { useState } from "react";
import axios from "axios";

export default function signUp({params}:any) {
  
  return (
    <div className="bg-black text-white flex justify-center items-center flex-col h-screen w-screen">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <span className="text-3xl font-bold mb-4">{params.id}</span>
    </div>
  );
}
