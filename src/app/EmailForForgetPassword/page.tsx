"use client"
import React, { useState,  } from 'react'
import axios from 'axios'



function EmailForForgetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, SetErrorMessage] = useState("");
    const [allowed, setAllowed] = useState(false);
    const [message, setMessage] = useState("");


    const handleSubmit = async () => {
        try {
            const res = await axios.post('/api/EmailVerify', { email });
            console.log(res.data);
            if (res.data) {
                setAllowed(true);
                setMessage("check your email!");
            }
            else {
                setError(true);
                SetErrorMessage("user not found!");
                console.log(res.data.message);
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
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='put your email here....'
                className='bg-gray-50 border-2'

            />
            {allowed ?
                <h1 className=' p-1 bg-green-600 text-2xl font-bold'>{message}</h1> :
                <button onClick={handleSubmit} className='p-4 font-bold bg-green-500 text-white'>
                    Submit
                </button>}

        </div>
    )
}


export default EmailForForgetPassword;