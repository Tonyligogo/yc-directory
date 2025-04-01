import { Hero } from '@/components/custom/Hero';
import StartupCard from '@/components/custom/StartupCard';
import View from '@/components/custom/View';
import { Skeleton } from '@/components/ui/skeleton';
import { client } from '@/sanity/lib/client';
import { CATEGORIES_BY_SLUG_FETCH, SIGNLE_STARTUP_FETCH } from '@/sanity/lib/queries';
import MarkdownIt from 'markdown-it';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const StartupDetails = async ({params}) => {
    const id = (await params).id;
    const md = MarkdownIt();
    const [post, {select: editorPicks}] = await Promise.all([
      client.fetch(SIGNLE_STARTUP_FETCH, {id}),
      client.fetch(CATEGORIES_BY_SLUG_FETCH, {slug: 'editor-picks'})
    ])
    
    if(!post) return notFound()
    const parsedPitch = md.render(post?.pitch || '');
  return (
    <>
    <Hero heading={post.title} createdAt={post._createdAt} height={'h-[300px]'} subHeading={post.description} />
    <section className='max-w-screen-lg px-4 mx-auto mt-5'>
        <img src={post.image} alt='thumbnail' className='w-full max-h-[400px] object-cover rounded-xl' />
        <div className='space-y-5 mt-10 max-w-screen-lg mx-auto'>
            <div className='flex justify-between items-center gap-5 '>
                <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
                <img src={post.author.image} alt="avatar" className='w-14 h-14 border-2 border-gray-300 rounded-full drop-shadow-lg' />
                <div>
                <p className='font-semibold'>{post.author.name}</p>
                <p className='text-sm text-gray-500'>{`@${post.author.username}`}</p>
                </div>
                </Link>
                <p className='text-sm bg-black text-white px-4 py-2 rounded-full'>{post.category}</p>
            </div>
                <h3 className='font-semibold text-2xl'>Pitch Details</h3>
                {parsedPitch ? (
                  <article
                    className='mt-5 prose'
                    dangerouslySetInnerHTML={{__html: parsedPitch}}
                  />
                ) : (
                  <p className='text-gray-500'>No details provided</p>
                )}
        </div>
    </section>
    <hr className='my-8 max-w-screen-lg mx-4 md:mx-auto'/>
    {editorPicks?.length > 0 ? (
       <section className='max-w-screen-lg px-4 mx-auto mb-5'>
       <p className='text-2xl font-semibold mb-5'>Editor Picks</p>
       <ul className="card_grid">
       {editorPicks?.length > 0 ? (
          editorPicks.map((post) => (
           <StartupCard key={post?._id} post={post} />
          ))
        ) : null}
       </ul>
   </section>
    ) : (
      null
    )}
    {/* View Count */}
    <Suspense fallback={<Skeleton />} >
          <View id={id}/>
    </Suspense>
    </>
  )
}

export default StartupDetails