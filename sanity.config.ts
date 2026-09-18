import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool, defineDocuments, defineLocations} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {documentInternationalization} from '@sanity/document-internationalization'
import {assist} from '@sanity/assist'
import {resolve} from './lib/resolve'

// Types that should only ever have one document
const singletonTypes = new Set(['homePage', 'platformOverview'])

// Actions that make sense for a singleton
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

const mainDocuments = defineDocuments([
  {
    route: '/',
    type: 'homePage',
  },
  {
    route: '/platform',
    type: 'platformOverview',
  },
  {
    route: '/customers/:slug',
    filter: `_type == "customerStory" && slug.current == $slug`,
  },
  {
    route: '/glossary/:slug',
    filter: `_type == "glossaryTerm" && slug.current == $slug`,
  },
])

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
    presentationTool({
      resolve,
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      allowOrigins: ['http://localhost:4321'],
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
