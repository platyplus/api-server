import { AuthPayloadResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'

export interface AuthPayloadParent {
  id: string
  token: string
}

export const AuthPayload: AuthPayloadResolvers.Type<TypeMap> = {
  token: parent => parent.token,
  user: (parent, _args, ctx) => ctx.db.user({ id: parent.id }),
}
