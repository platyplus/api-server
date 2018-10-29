import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './generated/prisma-client'
import { resolvers } from './resolvers'
import getUser from './authorization/getUser'
import { hostSettings } from './rest'
// import directiveResolvers from './directiveResolvers'
import permissions from './authorization/permissions';
const db = new Prisma({
  endpoint: `${process.env.PRISMA_PROTOCOL || 'https'}://${process.env.PRISMA_SERVER}/${process.env.PRISMA_SERVICE}/${process.env.PRISMA_STAGE}`,
  secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
  // debug: true, // log all GraphQL queries & mutations sent to the Prisma API
})
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: resolvers as any,
  middlewares: [getUser, permissions],
  // directiveResolvers,
  context: req => ({ ...req, db }),
})
server.express.get('/host-settings', (req, res, next) => hostSettings(req, res, next, db))
server.start({ port: 5000 }, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`),
)
