import {headers as getHeaders,cookies as getCookies} from "next/headers";

import { baseProcedure, createTRPCRouter} from "@/trpc/init";

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { AUTH_COOKIE } from "../constants";


export const authRouter=createTRPCRouter({
  session:baseProcedure.query(async ({ ctx }) => {
    const headers=await getHeaders();
    const seesion=await ctx.db.auth({headers})

    return seesion;
  }),
  logout:baseProcedure.mutation(async () => {
    const cookies=await getCookies();
    cookies.delete(AUTH_COOKIE)
  }),
  register:baseProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
      username:z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(63, { message: 'Username must be at most 63 characters long' })
        .regex(
           /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
           "UserName can only contain lowercase letters, numbers, and hyphens, and must start and end with a letter or number."
        )
        .refine(
        (val) => !val.includes(" "), {
          message: "Username cannot contain spaces"
        })
        .transform((val) => val.toLowerCase())
      })
  )
  .mutation(async ({ input ,ctx}) => {
    await ctx.db.create({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
        username: input.username, //This will be jhashed
      },
    })
    const data=await ctx.db.login({
      collection: 'users',
      data:{
        email: input.email,
        password: input.password,
      }
    })
    if(!data.token){
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      })
    }
    const cookies=await getCookies();
    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: '/',
      sameSite:'none'
    })
    return data;
  }),
  
  login:baseProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string()
    
      })
  )
  .mutation(async ({ input ,ctx}) => {
    const data=await ctx.db.login({
      collection: 'users',
      data:{
        email: input.email,
        password: input.password,
      }
    })
    if(!data.token){
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      })
    }
    const cookies=await getCookies();
    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: '/',
      sameSite:'none'
    })
    return data;
  }),
});

