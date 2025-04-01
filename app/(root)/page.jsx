
import { auth } from "@/auth";
import SearchForm from "@/components/custom/SearchForm";
import StartupCard from "@/components/custom/StartupCard";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({searchParams}) {
  const query = (await searchParams).query;
  const session = await auth();
  const params ={search:query || null};
  const posts = await client.fetch(STARTUPS_QUERY, params);

  return (
    <main>
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-background">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="h-full absolute px-4 flex items-center">
        <div>
          <p className="heading">Pitch Your Startup, <br/> Connect With Entreneurs</p>
          <p className="text-center text-lg">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>
          <SearchForm query={query} />
        </div>
      </div>
    </div>
    <section className='max-w-screen-lg mx-auto mt-8 mb-5'>
      <p className="text-center text-2xl font-semibold">{query ? `Search results for "${query}"` : 'All startups'}</p>
      <ul className="mt-7 card_grid px-4">
        {posts?.length > 0 ? (
          posts.map((post) => (
           <StartupCard key={post?._id} post={post} />
          ))
        ) : (
          <p className="text-center text-xl font-semibold">No posts found</p>
        )}
      </ul>
    </section>
    </main>
  );
}
