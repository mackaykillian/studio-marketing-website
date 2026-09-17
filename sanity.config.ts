import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Types that should only ever have one document
const singletonTypes = new Set(['homePage'])

// Actions that make sense for a singleton
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'Marketing Website',

  projectId: '7o6t0dl5',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .schemaType('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage').title('Home Page')),
            S.divider(),
            // Everything else, minus the singletons
            ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId()!)),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Keep homePage out of the global "New document" menu
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Strip Duplicate / Delete from singletons
    actions: (input, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
