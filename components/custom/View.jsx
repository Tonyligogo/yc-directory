import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_FETCH } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

const View = async ({id}) => {
    const {views: totalViews} = await client
    .withConfig({useCdn:false})
    .fetch(STARTUP_VIEWS_FETCH, {id})

    after( async()=> 
        await writeClient
        .patch(id)
        .set({views: totalViews + 1 })
        .commit()
    );

  return (
    <div className='relative'>
        <div className='absolute bottom-4 right-10'>
            <div className='relative'>
                <span className='bg-black rounded text-white px-2 py-1'>{totalViews} {`${totalViews > 1 ? 'Views' : 'View'}`}</span>
            <span className="absolute -top-2 -right-1 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
            </div>
        </div>
    </div>
  )
}

export default View