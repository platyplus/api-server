import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import resolvers from './resolvers'
import * as fs from 'fs'
const schema = 'schema.graphql'
const typeDefs = fs.existsSync(`./dist/${schema}`) ? `./dist/${schema}` : `./src/${schema}` // TODO dirty workaround
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: `${process.env.PRISMA_ENDPOINT}/${process.env.NODE_ENV}`,
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
    }),
  }),
})
console.log(process.env.NODE_ENV)
server.start({port: 5000}, () => console.log(`Server is running on http://localhost:5000`))
