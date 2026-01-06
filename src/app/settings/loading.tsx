import SideBar from '@/components/SideBar'
import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='min-h-screen flex bg-zinc-100'>
      <div className='hidden lg:block'>
        <SideBar />
      </div>
      <div className='lg:ml-60 flex-1 flex items-center justify-center'>
        <Loader2 className="animate-spin" width={50} height={50} strokeWidth={1.3} />
      </div>
    </div>
  )
}

export default Loader