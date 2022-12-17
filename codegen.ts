import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://squint-test.hasura.app/v1/graphql',
  documents: ['src/gql-operations/**/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript-react-query',
        'typescript',
        'typescript-operations',
      ],
       config: {
        exposeQueryKeys: true,
        exposeDocument: true,
        exposeFetcher: true,
        errorType: 'Error',
        fetcher: {
          func: '../utils/hooks#useFetchData',
          isReactHook: true,
        },
      },
    }
  }
}
 
export default config
