"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'



function PasswordReset() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, SetErrorMessage] = useState("");
    const [allowed, setAllowed] = useState(false);
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);



    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])



    const handleSubmit = async () => {
        try {
            const res = await axios.post('/api/VerifyRestPassword', { token , newPassword:confirmPassword });
            if (res.data) {
                setAllowed(true);
                setVerified(true);
            }
            else {
                setError(true);
                SetErrorMessage("user not found!");
            }

        } catch (error: any) {
            setError(true);
            SetErrorMessage(error.message || "something went wrong!");
        }
    }


    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            {
                error &&
                <div className='p-2 text-red-400'>
                    {errorMessage}
                </div>
            }

            <input
                id="newPassword"
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter new Password'
                 className='bg-gray-50 border-2'

            />
            <input
                id="confirmPassword"
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Enter confirm  Password'
                 className='bg-gray-50 border-2'

            />
            
                
                <button onClick={handleSubmit} className='p-4 font-bold bg-green-500 text-white'>
                  {allowed ? "done!" : "Submit"}  
                </button>

        </div>
    )
}


export default PasswordReset;