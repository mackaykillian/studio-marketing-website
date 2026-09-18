import {defineField} from 'sanity'

export const companyReference = defineField({
  name: 'companyReference',
  title: 'Company',
  type: 'reference',
  to: [{type: 'companies'}],
})
