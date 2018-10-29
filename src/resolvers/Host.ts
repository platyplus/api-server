import { HostResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'
import { UserParent } from './User'

export interface HostParent {
  id: string
  hostName: string
  owner?: UserParent
  publicKey?: string
  tunnelPort?: number
  timeZone?: string
}

export const Host: HostResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  hostName: parent => parent.hostName,
  owner: parent => parent.owner || null,
  publicKey: parent => parent.publicKey || '',
  tunnelPort: parent => parent.tunnelPort || 0,
  timeZone: parent => parent.timeZone || '',
}
