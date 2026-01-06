import SideBar from '@/components/SideBar'
import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center ml-60 bg-zinc-100'>
      <SideBar />
        <Loader2 className="animate-spin" width={50} height={50} strokeWidth={1.3} />
    </div>
  )
}

export default Loader