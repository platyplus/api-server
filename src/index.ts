import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: `http://${process.env.PRISMA_SERVER}/${process.env.PRISMA_SERVICE}/${process.env.PRISMA_STAGE}`,
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
    }),
  }),
})
server.start({port: 5000}, () => console.log(`Server is running on http://localhost:5000`))
