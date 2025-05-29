"use client";
import { useForm } from 'react-hook-form';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';
import { Poppins } from 'next/font/google'
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { registerSchema } from '../../schemas';

import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

export const SignUpview = () => {
  const router = useRouter();
  const trpc= useTRPC();
  const register = useMutation(trpc.auth.register.mutationOptions({
    onError:(error) => {
      toast.error(error.message || 'An error occurred while registering');
    },
    onSuccess:()=>{
      router.push('/')

    }
  }));
  const form = useForm<z.infer<typeof registerSchema>>({
    mode:'all',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register.mutate(values)
  }
  const username=form.watch('username');
  const usernameErrors=form.formState.errors.username
  const showPreview=username && !usernameErrors;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16">

            <div className='flex items-center justify-between mb-8'>
              <Link href="/">
                <span className={cn("text-2xl font-semibold", poppins.className)}>
                  Dinero
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className='text-base border-none underline'>
                <Link prefetch href="/sign-in">
                  Sign In
                </Link>
              </Button>
            </div>
          <h1 className='text-4xl font-medium'>
            Join the largest marketplace Dinero     
          </h1>
          <FormField 
          name="username"
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-base'>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription
              className={cn('hidden',showPreview && "block")}
              >
                  Your Store will be available at&nbsp;
                  <strong>{username}</strong>.shop.com
                </FormDescription>
                <FormMessage />
            </FormItem>
          )}/>
          <FormField 
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-base'>Email</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField 
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-base'>Password</FormLabel>
              <FormControl>
                <Input {...field} type='password'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <Button
          type='submit'
          size='lg'
          variant='elevated'
          className='bg-black text-white hover:bg-green-500 hover:text-primary'
          disabled={register.isPending}
          >
            Create Account
          </Button>
          </form>
        </Form>
      </div>
      <div className="h-screen lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.jpg')",
          backgroundSize: "cover"
          , backgroundPosition: "center",
        }}
      >
      </div>

    </div>

  )
}