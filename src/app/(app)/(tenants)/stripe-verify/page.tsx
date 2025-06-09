"use client"
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import { LoaderIcon } from 'lucide-react'
import React, { useEffect } from 'react'

const Page = () => {

  const trpc=useTRPC()
  const {mutate:verify}=useMutation(trpc.checkoutRouter.verify.mutationOptions({
    onSuccess: (data) => { 
      if(!data) return window.location.href="/";
      window.location.href = data.url;
    },
    onError:()=>{
      window.location.href="/"
    }

  }));

  useEffect(() => {
    verify();
  },
  [verify]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <LoaderIcon className='animate-spin text-muted-foreground'/>
    </div>
  )
}

export default Page