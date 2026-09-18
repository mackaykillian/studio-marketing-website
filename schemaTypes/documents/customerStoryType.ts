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
      options: {
        source: 'title', // or whatever your source field is
        maxLength: 96,
        isUnique: async (slug, context) => {
          const {document, getClient} = context
          const client = getClient({apiVersion: '2024-01-01'})

          const id = document?._id.replace(/^drafts\./, '')
          const language = document?.language

          const params = {
            draft: `drafts.${id}`,
            published: id,
            slug,
            language,
          }

          const query = `!defined(*[
        _type == "customerStory" &&
        slug.current == $slug &&
        language == $language &&
        !(_id in [$draft, $published])
      ][0]._id)`

          const result = await client.fetch(query, params)
          return result
        },
      },
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
