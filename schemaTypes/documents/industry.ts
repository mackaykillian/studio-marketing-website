import {defineType, defineField} from 'sanity'

export const industry = defineType({
  name: 'industries',
  title: 'Industries',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
