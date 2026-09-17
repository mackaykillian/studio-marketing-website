// schemaTypes/formBlock.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'formBlock',
  title: 'Form',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    // defineField({ name: 'subheading', type: 'text' }),
    defineField({
      name: 'formType',
      title: 'Which form',
      type: 'string',
      options: {
        list: [
        //   { title: 'Contact Form', value: 'contact' },
        //   { title: 'Newsletter Signup', value: 'newsletter' },
          { title: 'Demo Request', value: 'demo' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submitButtonText',
      type: 'string',
      initialValue: 'Submit',
    }),
    defineField({ name: 'successMessage', type: 'text' }),
    // defineField({ name: 'recipientEmail', title: 'Send submissions to', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'formType' },
  },
})