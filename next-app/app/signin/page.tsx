import SignInComp from "@/components/signin/signincomp"
import SignInMessage from "@/components/signin/signinmessage"

export default function SignInPage({ searchParams } : { searchParams?: { callbackUrl?: string }}){
    return(<div className="min-h-screen min-w-full grid grid-cols-1 md:grid-cols-2">
        <div className="h-full w-full"> 
            <SignInComp  searchParams={searchParams} />
        </div>
        <div className="h-full w-full hidden md:block">
            <SignInMessage />
        </div>
    </div>)
}