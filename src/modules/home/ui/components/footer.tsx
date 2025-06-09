
'use client'

import { Button } from "@/components/ui/button"
import { logoutAction } from "../../server/procedures"
import Link from "next/link"

export const Footer = () => {

  return (
    <footer className="flex border-t justify-between font-medium p-6">
      <div className='flex items-center gap-2'>
        <p>Dinero @ {new Date().getFullYear()} | All rights reserved</p>
      </div>
      <Button
        variant="secondary"
        className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-red-500 transition-colors text-lg"
        onClick={() => logoutAction()}>
        <Link prefetch href="/sign-in">
          Log Out
        </Link>
      </Button>
    </footer>
  )
}