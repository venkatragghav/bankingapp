import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import MobileNav from "../../components/MobileNav";
import { getLoggedInUser } from "@/lib/actions/user1.actions";
import { redirect } from "next/navigation";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const LoggedIn= await getLoggedInUser();
  if(!LoggedIn) redirect('/sign-in')
  return (
    <main className="flex h-scrseen w-full font-inter">
        <Sidebar user={LoggedIn}/>
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src="/icons/logo.svg" width={30} height={30} alt="logo"/>

            <div>
          <MobileNav user={LoggedIn}/>
          </div>
          </div>
         
          {children}
        </div>
        
    </main>
  );
}