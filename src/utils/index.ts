import * as jwt from 'jsonwebtoken'
import { Prisma, User } from '../generated/prisma'
// import { getIntrospectionQuery } from 'graphql';
export { GitHub } from './GitHub';

export interface Context {
  db: Prisma
  request: any
  user: User
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
    return userId
  }

  throw new AuthError()
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
 
