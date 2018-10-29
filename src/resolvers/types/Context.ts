import { Prisma } from '../../generated/prisma-client'
import { UserParent } from '../User';

export interface Context {
  db: Prisma
  request: any
  user: UserParent
}
