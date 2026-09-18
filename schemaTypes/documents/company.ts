import {defineType, defineField} from 'sanity'
import {industryReference} from '../fields/industryReference'
import {businessSizeReference} from '../fields/businessSizeReference'

export const company = defineType({
  name: 'companies',
  title: 'Companies',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'darkLogo',
      title: 'DarkLogo',
      type: 'image',
    }),
    defineField({
      name: 'lightLogo',
      title: 'LightLogo',
      type: 'image',
    }),
    defineField({
      name: 'isGlobal',
      title: 'Is Global',
      type: 'boolean',
      description: 'Indicates whether the company operates globally',
    }),
    defineField({
      name: 'marqueeFeatured',
      title: 'Marquee Featured',
      type: 'boolean',
      description: 'Indicates whether the company is featured in the main logo marquee',
    }),
    defineField({
      name: 'brandColor',
      title: 'Brand Color (Hex)',
      type: 'string',
      description: 'Hex code for the background (e.g., #ff0000)',
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: 'hex',
          invert: false,
        }).error('Please enter a valid hex color code starting with #'),
    }),
    industryReference,
    businessSizeReference,
  ],
})
