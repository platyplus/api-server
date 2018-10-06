import { getUserId, Context, GitHub } from '../utils'
import { Base64 } from 'js-base64';

export const Query = {
  feed(parent, args, ctx: Context, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx: Context, info) {
    return ctx.db.query.post({ where: { id } }, info)
  },

  users(parent, args, ctx: Context, info) {
    return ctx.db.query.users({ where: args }, info)
  },

  hosts(parent, args, ctx: Context, info) {
    return ctx.db.query.hosts({ where: args }, info)
  },

  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}
