import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {documentInternationalization} from '@sanity/document-internationalization'
import { assist } from '@sanity/assist'

// Types that should only ever have one document
const singletonTypes = new Set(['homePage', 'platformOverview'])

// Actions that make sense for a singleton
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'Marketing Website',

  projectId: '7o6t0dl5',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'fr', title: 'French'},
      ],
      schemaTypes: ['customerStory'],
    }),
    assist({
      translate: {
        document: {
          languageField: 'language',
          documentTypes: ['customerStory'],
        },
      },
    }),
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
