import {headers as getHeaders} from "next/headers";
import { baseProcedure, createTRPCRouter} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";
import { stripe } from "@/lib/stripe";


export const authRouter=createTRPCRouter({
  session:baseProcedure.query(async ({ ctx }) => {
    const headers=await getHeaders();
    const seesion=await ctx.db.auth({headers})

    return seesion;
  }),
  register:baseProcedure
  .input(registerSchema)
  .mutation(async ({ input ,ctx}) => {
    const existingData=await ctx.db.find({
      collection: 'users',
      limit: 1,
      where: {
        username:{
          equals: input.username,
        }
      },
    })
    const existingUser=existingData.docs[0];
    if (existingUser) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Username already exists',
      });
    }
    if (process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_')) {
  throw new Error('Live Stripe key detected! Use a test key for this environment.');
}     
    const account=await stripe.accounts.create({});

    const tenant=await ctx.db.create({
      collection: 'tenants',
      data: {
        name: input.username,
        slug: input.username,
        stripeAccountId:account.id,
        stripeDetailsSubmitted:true,
      },
    })
   
    await ctx.db.create({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
        username: input.username, //This will be jhashed
        tenants:[
          {
            tenant: tenant.id,

          }
        ]
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
    await generateAuthCookie({
      prefix:ctx.db.config.cookiePrefix,
      value: data.token,
    })
    return data;
  }),
  
  login:baseProcedure
  .input(loginSchema)
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
    await generateAuthCookie({
      prefix:ctx.db.config.cookiePrefix,
      value: data.token,
    })
    return data;
  }),

});
