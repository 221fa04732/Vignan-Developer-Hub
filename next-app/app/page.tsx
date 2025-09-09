import { Appbar } from "@/components/header/appbar";
import { getServerSession } from "next-auth"
import authOption from "@/lib/googleauth";

async function getUser() {
  const session = await getServerSession(authOption);
  return session;
}

export default async function Home() {
  const session = await getUser();
  console.log(session)
  return (<div>
    <Appbar />
    <div>
      {JSON.stringify(session?.user?.name)}
    </div> 
    <div>
      {JSON.stringify(session?.user?.email)}
    </div> 
    <div>
      {JSON.stringify(session?.user?.image)}
    </div> 
    <div>
      {JSON.stringify(session?.user?.id)}
    </div> 
    <div>
      {JSON.stringify(session?.user?.role)}
    </div> 
    <img src={session?.user?.image as string}   alt={JSON.stringify(session?.user?.image)} />
  </div>);
}
