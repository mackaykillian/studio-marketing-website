import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletons = ['homePage']

export default defineConfig({
  name: 'default',
  title: 'Marketing Website',

  projectId: '7o6t0dl5',
  dataset: 'production',

  plugins: [    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('About Page')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Contact Page')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() && !singletons.includes(item.getId()!)
            ),
          ]),
    }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
