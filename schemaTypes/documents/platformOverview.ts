// schemaTypes/platformOverview.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'platformOverview',
  title: 'Platform Overview',
  type: 'document',
  fields: [
    defineField({name: 'heroEyebrow', type: 'string'}),
    defineField({name: 'heroHeading', type: 'string'}),
    defineField({name: 'heroSubheading', type: 'text'}),
  ],
})
