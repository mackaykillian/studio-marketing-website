// schemas/fields/relatedStories.ts
import {defineField} from 'sanity'

export const relatedStories = defineField({
  name: 'relatedStories',
  title: 'Related Customer Stories',
  description: 'Select up to 3 customer stories to show as "See more" cards.',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{type: 'customerStory'}], // adjust to your document type name
      options: {
        disableNew: true, // prevent creating new docs inline here
      },
    },
  ],
  validation: (Rule) => Rule.max(3).warning('You can only feature up to 3 related stories.'),
  options: {
    // makes each item render with a preview instead of a bare list
    layout: 'grid',
  },
})
