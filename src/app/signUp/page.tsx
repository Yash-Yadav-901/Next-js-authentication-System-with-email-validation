"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user);
      console.log("SignUp successful:", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("SignUp failed:", error);
      toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, username, password } = user;
    setButtonDisabled(!(email && username && password));
  }, [user]);

  return (
    <div className="bg-black text-white flex justify-center items-center flex-col h-screen w-screen">
      <h1 className="text-3xl font-bold mb-4">
        {loading ? "Processing..." : "Sign Up"}
      </h1>

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        required
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="bg-amber-50 text-black border-2 border-gray-500 rounded-md p-2 mb-2"
        placeholder="Enter your email here..."
      />

      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        required
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="bg-amber-50 text-black border-2 border-gray-500 rounded-md p-2 mb-2"
        placeholder="Enter your username here..."
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        required
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="bg-amber-50 text-black border-2 border-gray-500 rounded-md p-2 mb-4"
        placeholder="Enter your password here..."
      />

      <button
        onClick={handleSubmit}
        disabled={buttonDisabled}
        className={`bg-green-400 p-2 rounded-md transition-opacity duration-200 ${
          buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {buttonDisabled ? "Fill all fields" : "Sign Up"}
      </button>
    </div>
  );
}