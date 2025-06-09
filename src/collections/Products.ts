import { isSuperAdmin } from '@/lib/access';
// import { Tenant } from '@/payload-types';
import type { CollectionConfig } from 'payload'


export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    // create: ({ req }) => {
    //   if(isSuperAdmin(req.user)) return true;
    //   const tenant= req.user?.tenants?.[0]?.tenant as Tenant;
    //   return Boolean(tenant?.stripeDetailsSubmitted);

    // },
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: 'name',
    // description:"You must verify your account before creating products.",
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: "richText",
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'Price in INR',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-day", "14-day", "7-day", "3-day", "1-day", "no-refunds"],
      defaultValue: "30-day",
    },
    {
      name: "content",
      type: "richText",
      admin: {
        description: 'Protected Content only visible to customer after purchase. Add product documentation etc.',
      },
    },
    {
      name: "isPrivate",
      label: "Private Product",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description: 'If checked, this product will not be visible to customers unless they have purchased it.',
      },
    },
  ],
};