import {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['homePage', 'platformOverview'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // your main content types
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .schemaType('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage').title('Home Page')),
      S.listItem()
        .title('Platform Overview')
        .id('platformOverview')
        .schemaType('platformOverview')
        .child(
          S.document()
            .schemaType('platformOverview')
            .documentId('platformOverview')
            .title('Platform Overview'),
        ),

      S.divider(),

      S.documentTypeListItem('customerStory'),
      S.documentTypeListItem('glossaryTerms'),

      S.divider(),

      // grouped reference data
      S.listItem()
        .title('Reference Data')
        .child(
          S.list()
            .title('Reference Data')
            .items([
              S.documentTypeListItem('companies'),
              S.documentTypeListItem('industries'),
              S.documentTypeListItem('businessSize'),
            ]),
        ),
    ])

// structure: (S) =>
//         S.list()
//           .title('Content')
//           .items([
//             S.listItem()
//               .title('Home Page')
//               .id('homePage')
//               .schemaType('homePage')
//               .child(S.document().schemaType('homePage').documentId('homePage').title('Home Page')),
//             S.divider(),
//             // Everything else, minus the singletons
//             ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId()!)),
//           ]),
