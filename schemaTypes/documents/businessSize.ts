import {defineType, defineField} from 'sanity'

export const businessSize = defineType({
  name: 'businessSize',
  title: 'Business Size',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
