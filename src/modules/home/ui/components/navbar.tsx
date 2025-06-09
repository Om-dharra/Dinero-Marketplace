"use client";

import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client';
import { useState } from 'react';

import { NavbarSidebar } from './navbar-sidebar';
import { MenuIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

interface NavbarItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  href: string;
}

const NavbarItem=({
  href,
  children,
  isActive,
}:NavbarItemProps)=>{
  return (
    <Button variant="outline"
      className={cn("bg-transparent hover:bg-transparent roudned-full hover:border-primary border-transparent px-3.5 text-lg", {
        'text-primary': isActive,
        'text-muted-foreground': !isActive,
      })}

      asChild
    >
      <Link
        href={href}
        className="flex items-center h-full"
      >
        {children}
      </Link>
    </Button>

  )
}

const navbarItems = [
  { href: '/', children: 'Home' },
  { href: '/about', children: 'About' },
  { href: '/contact', children: 'Contact' },
  { href: '/services', children: 'Services' },
  { href: '/blog', children: 'Blog' },
];

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] =useState(false);

  const trpc=useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
      <nav className="flex items-center justify-between bg-white p-4 shadow-md">
    <Link href="/" className="pl-6 flex items-center">
    <span className={cn("text-5xl font-semibold", poppins.className)}>
      Dinero
    </span>
    </Link>
    <NavbarSidebar
      item={navbarItems}
      open={isSidebarOpen}
      onOpenChange={setIsSidebarOpen}
    />
    <div className="items-center gap-4 hidden lg:flex">
      {navbarItems.map((item) => (
        <NavbarItem
          key={item.href}
          href={item.href}
        >{item.children}</NavbarItem>
      ))}
    </div>
    {session.data?.user ? (
  <div className="hidden lg:flex">
    <Button
      asChild
      variant="secondary"
      className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-red-500 hover:text-black transition-colors text-lg"
    >
      <Link href="/admin">
        DashBoard
      </Link>
    </Button>
  </div>
) : (
  <div className="hidden lg:flex">
    <Button
      asChild
      variant="secondary"
      className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-red-500 transition-colors text-lg"
    >
      <Link prefetch href="/sign-in">
        Log In
      </Link>
    </Button>
    <Button
      asChild
      variant="secondary"
      className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-red-500 hover:text-black transition-colors text-lg"
    >
      <Link prefetch href="/sign-up">
        Start Selling
      </Link>
    </Button>
  </div>
)}
    
    <div className='flex lg:hidden items-center justify-center'>
      <Button
        variant="ghost"
        className="size-12 border-transparent bg-white"
        onClick={() => setIsSidebarOpen(true)}>
        <MenuIcon/>
      </Button>

    </div>
    
    </nav>
   
  )
}

