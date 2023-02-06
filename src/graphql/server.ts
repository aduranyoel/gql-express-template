import path from 'path';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadFilesSync } from '@graphql-tools/load-files';
import { loadSchemaSync } from '@graphql-tools/load';
import { mergeResolvers } from '@graphql-tools/merge';
import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';

const resolvers = loadFilesSync(path.join(__dirname, 'resolvers'));
const typeDefs = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()]
});

export const server = new ApolloServer({
  typeDefs,
  resolvers: mergeResolvers(resolvers),
});

export async function startGqlServer(app: Application): Promise<void> {
  await server.start();
  server.applyMiddleware({ app });
}
