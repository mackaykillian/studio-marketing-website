import {defineField} from 'sanity'

export const industryReference = defineField({
  name: 'industry',
  title: 'Industry',
  type: 'reference',
  to: [{type: 'industries'}],
})
