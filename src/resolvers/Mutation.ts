import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { MutationResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'
import { Context } from './types/context';

export interface MutationParent {}

export const Mutation: MutationResolvers.Type<TypeMap> = {
  async signup(_, args, ctx, _info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.createUser({...args, password })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET as jwt.Secret),
      id: user.id,
    }
  },

  upsertHost: (parent, args) => {
    throw new Error('Resolver not implemented')
  },

  async signin(parent, { login, password }, ctx: Context, info) {
    const user = await ctx.db.user({ login })
    if (!user) {
      throw new Error(`No such user found: ${login}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET as jwt.Secret),
      id: user.id,
    }
  },

  async upsertUser(parent, args, ctx: Context, info) {
    args.password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.upsertUser(
      { 
        where: { login: args.login },
        create: args,
        update: args
    })
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET as jwt.Secret),
      id: user.id,
    }
  }
}
