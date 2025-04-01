import { client } from '@/sanity/lib/client'
import StartupCard from './StartupCard'
import { USER_STARTUPS_FETCH } from '@/sanity/lib/queries'

const UserStartups = async ({id}) => {
    const startups = await client.fetch(USER_STARTUPS_FETCH,{id})
  return (
    <>
    {startups.length > 0 ?
        startups.map((startup) => (
            <StartupCard key={startup._id} post={startup}/>
        ))
    : (
        <p className='text-center text-2xl font-semibold'>No startups found</p>
    )}
    </>
  )
}

export default UserStartups