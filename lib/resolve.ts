import {defineLocations} from 'sanity/presentation'
import type {PresentationPluginOptions} from 'sanity/presentation'
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    homePage: defineLocations({
      message: 'This is the home page',
      locations: [
        {
          title: 'Home',
          href: '/',
        },
      ],
    }),
    platformOverview: defineLocations({
      message: 'This is the platform overview page',
      locations: [
        {
          title: 'Platform Overview',
          href: '/platform',
        },
      ],
    }),
    customerStory: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/customers/${doc?.slug}`,
          },
          {
            title: 'All customer stories',
            href: '/customers',
          },
        ],
      }),
    }),
    glossaryTerm: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        category: 'category->slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/glossary/${doc?.slug}`,
          },
          {
            title: 'All glossary terms',
            href: '/glossary',
          },
        ],
      }),
    }),
  },
}
