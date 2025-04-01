'use client';

import { X } from "lucide-react"
import Link from "next/link";

function SearchFormReset() {
    const reset = () => {
        const form = document.querySelector('.form')
        if(form) form.reset()
    }
  return (
    <button type='reset' onClick={reset} className='bg-black size-8 rounded-full flex items-center justify-center'> 
        <Link href='/'><X color='white' size={16}/></Link>
    </button>

  )
}

export default SearchFormReset