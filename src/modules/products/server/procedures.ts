
import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice:z.string().nullable().optional(),
        maxPrice:z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      if(input.minPrice){
        where.price = {}
        greater_than_equal: input.minPrice
      }
      if(input.minPrice){
        where.price = {}
        less_than_equal: input.maxPrice
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
      
      const data = await ctx.db.find({
        collection: 'products',
        depth: 1,
        where,
      });

      return data;
    }),
});

