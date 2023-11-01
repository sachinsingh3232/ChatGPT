'use client'
import React from 'react'
import { signIn } from "next-auth/react"
import Image from 'next/image'
const Login = () => {
    // console.log(process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!)
    return (
        <div className="bg-[#00A67E] flex flex-col justify-center items-center min-h-screen text-center">
            <Image
                src="https://brandpalettes.com/wp-content/uploads/2023/01/ChatGPT-Logo.png"
                width={300}
                height={300}
                alt="ChatGPT"
            />
            <button onClick={() => signIn('google')} className="text-white font-bold text-3xl animate-pulse">
                Sign In to use ChatGPT
            </button>
        </div>
    )
}

export default Login