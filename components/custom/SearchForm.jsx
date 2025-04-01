import { Search} from 'lucide-react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'

function SearchForm({query}) {    
  return (
    <Form action='/' scroll={false} className='form flex max-w-md mt-5 mx-auto items-center justify-between border-2 border-gray-900 rounded-full p-2'>
        <input name='query' type="text" defaultValue={query} placeholder='Search for a startup' className='w-full outline-none pl-2 pr-4' />
        <div className='flex gap-2'>
            {query && (<SearchFormReset />)}
            <button type='submit' className='bg-black size-8 rounded-full flex items-center justify-center'> <Search color='white' size={16}/> </button>
        </div>
    </Form>
  )
}

export default SearchForm