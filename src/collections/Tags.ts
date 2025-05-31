import type { CollectionConfig } from 'payload'

const Tags: CollectionConfig = {
  slug: 'tags',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name:"products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,

    }
  ],
}
export default Tags
