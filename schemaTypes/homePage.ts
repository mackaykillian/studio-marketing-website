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
    defineField({name: 'heroImage', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {type: 'ctaBlock'},
        {type: 'testimonialBlock'},
        {type: 'faqBlock'},
        {type: 'imageTextBlock'},
      ],
    }),
    defineField({name: 'seo', type: 'seoMeta'}),
  ],
})
