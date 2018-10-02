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
    return ctx.db.query.users({where: args}, info)
  },

  /** Generates the settings.nix file of the given host from its login, base 64 encoded */
  hostSettings(parent, { login }, ctx: Context, info) {
    return ctx.db.query.users({ where: { login }}).then(([user]) => {
      return GitHub.getFile(process.env.NIXOS_GITHUB_REPOSITORY, "settings.nix.template").then((settingsTemplate) => {
        settingsTemplate = settingsTemplate.replace('{{hostname}}', user.name)
        settingsTemplate = settingsTemplate.replace('{{timezone}}', user.timeZone)
        settingsTemplate = settingsTemplate.replace('{{tunnelport}}', String(user.tunnelPort))
        return Base64.encode(settingsTemplate)
      })
    })
  },

  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}
