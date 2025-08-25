"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);


    const verifyEmail = async () => {
        try {
            await axios.post('/api/verifyEmail', { token });
            setVerified(true);

        } catch (error: any) {
            setError(true);
            console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className='flex flex-col items-center justify-center h-screen w-screen'>
            <h1 className='p-2 font-bold text-2xl'>Verify Email</h1>
            <h2 className='p-2 font-bold text-2xl'>{token ? `${token}` : "No token here"}</h2>

            {
                verified &&
                <div>
                    <h2 className='p-2 font-bold text-2xl'>Your email is verified go login!</h2>

                    <Link href="/login" className='p-2 bg-green-600 text-white'>
                        Login
                    </Link>

                </div>
            }

            {
                error &&
                <div>
                    <h2 className='p-2  text-red-400  text-2xl'>Error</h2>

                </div>
            }
        </div>
    )
}

export default VerifyEmailPage;
