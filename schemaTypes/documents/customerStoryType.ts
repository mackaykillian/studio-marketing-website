import {defineField, defineType} from 'sanity'
import {relatedStories} from '../fields/relatedStories'

export const customerStoryType = defineType({
  name: 'customerStory',
  title: 'Customer Story',
  type: 'document',
  fields: [
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
      validation: (Rule) =>
        Rule.required().custom((url) => {
          if (!url) return true

          // Regex to validate standard Wistia watch links and embed links
          const wistiaRegex = /(?:wistia\.com|wi\.st)\/(?:medias|series)\/[a-zA-Z0-9]+/

          return wistiaRegex.test(url) ? true : 'Please enter a valid Wistia video link.'
        }),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    relatedStories,
  ],
})
