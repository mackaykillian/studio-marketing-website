// schemaTypes/homePage.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({name: 'heroEyebrow', type: 'string'}),
    defineField({name: 'heroHeading', type: 'string'}),
    defineField({name: 'heroSubheading', type: 'text'}),
  ],
})
