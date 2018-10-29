import { QueryResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface QueryParent {}

export const Query: QueryResolvers.Type<TypeMap> = {
  users: async (_parent, _args, ctx) => {
    return ctx.db.users()
  },
  hosts: async (_parent, _args, ctx) => {
    return ctx.db.hosts()
  },
  me: parent => null,
}
