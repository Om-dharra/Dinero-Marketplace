import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import Stripe from "stripe";
import { CheckoutMetadata, ProductMetadata } from "../types";
import { stripe } from "@/lib/stripe";
import { generateTenantURL } from "@/lib/utils";
import { getPayload } from "payload";
import config from "@payload-config";


export const checkoutRouter = createTRPCRouter({
  verify: protectedProcedure
    .mutation(async ({ ctx }) => {
      if (!ctx.session.user) return false;
      const user = await ctx.db.findByID({
        collection: 'users',
        id: ctx.session.user.id,
        depth: 0,
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }
      const tenantId = user.tenants?.[0]?.tenant as string;
      const tenant = await ctx.db.findByID({
        collection: 'tenants',
        id: tenantId,
      });
      if (!tenant) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found" });
      }
      const accountLink = await stripe.accountLinks.create({
        account: tenant.stripeAccountId,
        refresh_url: `${process.env.NEXT_PUBLIC_APP_URL!}/admin`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL!}/admin`,
        type: 'account_onboarding',
      });

      if (!accountLink.url) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Failed to create account link" });
      }
      return { url: accountLink.url };
    }
    ),
  purchase: protectedProcedure
    .input(
      z.object({
        productIds: z.array(z.string()).min(1),
        tenantSlug: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.db.find({
        collection: 'products',
        depth: 2,

        where: {
          and: [
            {
              id: {
                in: input.productIds,
              }
            },
            {
              "tenant.slug": {
                equals: input.tenantSlug,
              }
            }
          ]
        },
      })
      if (products.totalDocs !== input.productIds.length) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Products not found" });
      }

      const tenantsData = await ctx.db.find({
        collection: 'tenants',
        limit: 1,
        pagination: false,
        where: {
          slug: {
            equals: input.tenantSlug,
          }
        },
      });
      const tenant = tenantsData.docs[0];
      if (!tenant) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found" });
      }
      const payload =await getPayload({config});

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.docs.map((product) => ({
          quantity: 1,
          price_data: {
            unit_amount: product.price * 100, // Convert to cents
            currency: 'inr',
            product_data: {
              name: product.name,
              metadata: {
                stripeAccountId: tenant.stripeAccountId,
                id: product.id,
                name: product.name,
                price: product.price,

              } as ProductMetadata
            },
          },
        }))
      if (!ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "You need to login to checkout" });
      }
      const domain = generateTenantURL(input.tenantSlug);

      const checkout = await stripe.checkout.sessions.create({
        customer_email: ctx.session.user.email,
        success_url: `${domain}/checkout?success=true`,
        cancel_url: `${domain}/checkout?cancel=true`,
        mode: "payment",
        line_items: lineItems,
        invoice_creation: {
          enabled: true,
        },
        metadata: {
          userId: ctx.session.user.id,
        } as CheckoutMetadata,
      })
      
      for (const product of products.docs) {
      await ctx.db.create({
        collection: "orders",
        data: {
          stripeCheckoutSessionId: checkout.id,
          user: ctx.session.user.id,
          product: [product.id],
          name: product.name,
        },
      });
    }
      
      // console.log(process.env.NEXT_PUBLIC_APP_URL);
      if (!checkout.id) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
      }
      return { url: checkout.url }
    })
  ,
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: 'products',
        depth: 2,
        where: {
          id: {
            in: input.ids,
          }
        }
      });
      if (data.totalDocs !== input.ids.length) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Products not found" });
      }
      const totalPrice = data.docs.reduce((acc, product) => {
        const price = Number(product.price);
        return acc + (isNaN(price) ? 0 : price);
      }, 0)
      return {
        ...data,
        totalPrice: totalPrice,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.images as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null }
        }))
      };
    }),
});

