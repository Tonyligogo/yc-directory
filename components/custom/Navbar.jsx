import { auth, signOut, signIn } from "@/auth";
import { LogOut, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
    const session = await auth();
  return (
    <header className="px-5 py-3 bg-black text-white shadow-sm ">
        <nav className="flex justify-between items-center ">
            <Link href="/">
                <Image src="/logo.svg" alt="logo" width={100} height={30} />
            </Link>
            <div className="flex items-center gap-5">
                {session && session?.user ? (
                    <>
                    <Link href="/startup/create">
                        <span className="hidden sm:block">Create</span>
                        <PlusCircle className="w-5 h-5 sm:hidden" />
                    </Link>
                    <form action={async()=>{
                        'use server';
                        await signOut({redirectTo: '/'});
                    }}>
                        <button className="flex items-center " type='submit'>
                            <span className="hidden sm:block">Logout</span>
                            <LogOut className="w-4 h-4 sm:hidden" />
                        </button>
                    </form>
                    <Link href={`/user/${session?.id}`}>
                    <span>{session?.user?.name}</span>
                    </Link>
                    </>
                ) : (
                    <form action={ async()=>{
                        'use server'

                        await signIn('github')
                    }}> 
                        <button type='submit'>Login</button> 
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar