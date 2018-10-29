import { UserResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'
import { ROLE } from './types/Enum';

export interface UserParent {
  id: string
  login: string
  role?: ROLE
  name: string
}

export const User: UserResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  login: parent => parent.login,
  role: parent => parent.role,
  name: parent => parent.name,
}
