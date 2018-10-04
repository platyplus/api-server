import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import getUser from './authorization/getUser'
import resolvers from './resolvers'
// import directiveResolvers from './directiveResolvers'
import permissions from './authorization/permissions';
const db = new Prisma({
  endpoint: `${process.env.PRISMA_PROTOCOL || 'https'}://${process.env.PRISMA_SERVER}/${process.env.PRISMA_SERVICE}/${process.env.PRISMA_STAGE}`,
  // debug: true, // log all GraphQL queries & mutations sent to the Prisma API
  secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
})
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  middlewares: [getUser, permissions],
  // directiveResolvers,
  context: req => ({
    ...req,
    db
  }),
})
server.start({port: 5000}, () => console.log(`Server is running on http://localhost:5000`))
