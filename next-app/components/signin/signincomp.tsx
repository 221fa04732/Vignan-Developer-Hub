"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInComp({ searchParams } : { searchParams?: { callbackUrl?: string }}){
    return(<form className="w-full h-full bg-neutral-900 flex flex-col justify-center items-center"
        onSubmit={async (e) => {
            e.preventDefault();
            try{
                await signIn("google", {
                    callbackUrl: searchParams?.callbackUrl ?? "/",
                });
            } 
            catch (error) {
                console.error("Signin failed", error);
            }
        }}>
        <Image src={"/logo.png"} height={400} width={400} alt="Vignan Developer Club"/>
        <button type="submit" className="text-white bg-blue-500 rounded-lg px-6 py-2 cursor-pointer">Sign in with Google</button>
    </form>
)}
