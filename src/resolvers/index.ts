import { IResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

import { Query } from './Query'
import { Mutation } from './Mutation'
// import { Subscription } from './Subscription'
import { AuthPayload } from './AuthPayload'
import { User } from './User'
import { Host } from './Host'
// import { Application } from './Application'

export const resolvers: IResolvers<TypeMap> = {
  Query,
  Mutation,
  // Subscription,
  AuthPayload,
  User,
  Host,
  // Application,
}
