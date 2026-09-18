import {defineField, defineType} from 'sanity'

export const glossaryTerms = defineType({
  name: 'glossaryTerms',
  title: 'Glossary Terms',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'term',
      title: 'Term Name',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'term'},
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'termsAndDescription',
      title: 'Terms and Description',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    // SEO fields — assign fieldset: 'seo'
    defineField({
      name: 'titleTag',
      title: 'Title Tag',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
    }),
  ],
})
