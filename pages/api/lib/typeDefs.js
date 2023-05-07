/* eslint-disable import/no-anonymous-default-export */
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const typesArray = loadFilesSync('**/*.gql')

const mergeTypes = mergeTypeDefs(typesArray)
export default {
  ...mergeTypes
}