import {defineField, defineType} from 'sanity'
import {relatedStories} from '../fields/relatedStories'
import {companyReference} from '../fields/companyReference'
import {industryReference} from '../fields/industryReference'
import {businessSizeReference} from '../fields/businessSizeReference'

export const customerStoryType = defineType({
  name: 'customerStory',
  title: 'Customer Story',
  type: 'document',
  fields: [
    companyReference,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
    }),
    defineField({
      name: 'showCustomerLogo',
      title: 'Show Customer Logo',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'wistiaUrl',
      title: 'Wistia Video URL',
      type: 'url',
      description: 'Paste the full Wistia video URL (e.g., https://wistia.com)',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    relatedStories,
    industryReference,
    businessSizeReference,
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: false,
    }),
  ],
})
