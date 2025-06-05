
import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import { z } from "zod";
import { sortValues } from "../search-params";
import { DEFAULT_LIMIT } from "@/constants";

export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id:z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const product=await ctx.db.findByID({
        collection:"products",
        id:input.id,
        depth:2,
      });
      return {
        ...product,
        image: product.images as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
      };
    }),


  getMany: baseProcedure
    .input(
      z.object({
        cursor:z.number().default(1),
        limit:z.number().default(DEFAULT_LIMIT),
        category: z.string().nullable().optional(),
        minPrice:z.string().nullable().optional(),
        maxPrice:z.string().nullable().optional(),
        tags:z.array(z.string()).nullable().optional(),
        sort:z.enum(sortValues).nullable().optional(),
        tenantSlug:z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";
      if (input.sort) {
        switch (input.sort) {
          case "curated":
            sort = "-createdAt";
            break;
          case "trending":
            sort = "name";
            break;
          case "Hyped":
            sort = "+createdAt";
            break;
          default:
            sort = "-createdAt";
        }
      }

      // where.status = {
      //   equals: "published",
      // };

      if(input.minPrice && input.maxPrice){
        where.price={
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice,
        }
      }else if(input.minPrice){
        where.price={
          greater_than_equal: input.minPrice,
        }
      }else if(input.maxPrice){
        where.price={
          less_than_equal: input.maxPrice,
        }
      }
      if(input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
        };
      }
      if (input.category) {
        // Optionally, you can fetch category details here if needed
        const categoriesData = await ctx.db.find({
          collection: 'categories',
          depth: 1,
          pagination: false, // Disable pagination to get all categories
          where: {
            slug: {
              equals: input.category,
            },
          },
        });
        const formattedData = categoriesData.docs.map((doc) => ({
                  ...doc,
                  subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                    ...(doc as Category),
                    subcategories:undefined, //remove subcategories from subcategories
                  })),
                }));
        const subcategoriesSlugs = [];
        const parentCategory = formattedData[0];
        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map((subcategory)=> subcategory.slug)
          );
          where["category.slug"] = {
          in: [parentCategory.slug,...subcategoriesSlugs],
        };
      }
      }
      if(input.tags && input.tags.length > 0){
        where['tags.name'] = {
          in: input.tags,
        };
      }
      
      const data = await ctx.db.find({
        collection: 'products',
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      return {
        ...data,
        docs:data.docs.map((doc)=>({
          ...doc,
          image:doc.images as Media | null,
          tenant:doc.tenant as Tenant & {image: Media | null} 
        }))
      };
    }),
});

