import Image from "next/image";

export default function SignInMessage(){
    return(<div className="w-full h-full bg-neutral-800 flex justify-center items-center">
        <div className="w-10/12 h-full flex flex-col justify-center items-start">
            <div className="text-white font-bold text-4xl">"The only way to learn a new programming language is by writing programs in it."</div>
            <div className="text-white font-bold pt-4">Dennis Ritchie</div>
            <div className="text-gray-500 text-sm">Creator of C | Co-creator of Unix</div>
        </div>   
    </div>)
}