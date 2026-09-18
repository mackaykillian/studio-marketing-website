import {defineField} from 'sanity'

export const businessSizeReference = defineField({
  name: 'businessSize',
  title: 'Business Size',
  type: 'reference',
  to: [{type: 'businessSize'}],
})
