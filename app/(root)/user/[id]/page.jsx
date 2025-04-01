import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { auth } from '@/auth';
import { AUTHOR_FETCH_BY_ID } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import UserStartups from "@/components/custom/UserStartups";
import { StartupCardSkeleton } from "@/components/custom/StartupCard";
import { Suspense } from "react";

const Profile = async ({params}) => {
    const id = (await params).id;
    const session = await auth();
    const user = await client.fetch(AUTHOR_FETCH_BY_ID,{id})
    if(!user) return notFound();
  return (
    <>
    <div className="relative flex h-[300px] max-h-[350px] w-full items-center justify-center overflow-hidden bg-background">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="absolute flex items-center">
        <div>
          
      <img src={user?.image} alt="avatar" className='w-24 h-24 border-2 border-black rounded-full mx-auto' />
      <p className="heading">{user?.name}</p>
      <p className="text-center font-semibold text-lg max-w-3xl">@{user?.username}</p>
      <p className="text-center max-w-3xl">{user?.bio}</p>
        </div>
      </div>
    </div>
    <section className='max-w-screen-lg px-4 mx-auto mb-5'>
        <p className='text-2xl font-semibold mb-5 mt-5'>{session?.id === id ? 'Your Startups' : 'All Startups' }</p>
        <ul className="card_grid_sm">
            <Suspense fallback={<StartupCardSkeleton/>}>
                <UserStartups id={id}/>
            </Suspense>
        </ul>
    </section>
    </>
  )
}

export default Profile