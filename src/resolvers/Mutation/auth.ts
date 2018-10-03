import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Context, GitHub } from '../../utils'

export const auth = {
  async signup(parent, args, ctx: Context, info) { // TODO open/free subscription
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password },
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  /** Create/Update a HOST_SERVICE account. Accessible to admins only
     * Set the tunnel port as a calculated value
     * TODO: revoir ce qu'on récupère et met à jour depuis la requête update e.g. password etc.
    */
  async upsertHost(parent, args, ctx: Context, info) {
    // TODO: controll access
    const password = await bcrypt.hash(args.password, 10)
    const role = 'HOST_SERVICE'
    const tunnelPort = Number(process.env.NIXOS_FIRST_TUNNEL_PORT) + await ctx.db.query.usersConnection({where: {role:"HOST_SERVICE"}},'{ aggregate { count } }').then(res => res.aggregate.count)
    // TODO: get timeZone from http request?
    // Updates the tunnel public keys file in the repository
    if (args.publicKey) {
      let tunnelKeysString = await GitHub.getFile(process.env.NIXOS_GITHUB_REPOSITORY, "keys/tunnel")
      let tunnelKeys = tunnelKeysString.split("\n")
      let found = false
      tunnelKeys = tunnelKeys
        .map(key => {
          if (key.includes(args.login)) {
            found = true
            return args.publicKey
          } else return key
        })
        .filter(key => key != '')
      let message = `Udpated the public key for ${args.login}`
      if (!found) {
        tunnelKeys.push(args.publicKey)
        message = `Created the public key for ${args.login}`
      }
      tunnelKeysString = tunnelKeys.join("\n")
      await GitHub.updateFile(process.env.NIXOS_GITHUB_REPOSITORY, 
        "keys/tunnel", 
        tunnelKeysString, 
        message).catch(error => console.log(error))
    }
    const user = await ctx.db.mutation.upsertUser(
      { 
        where: {
          login: args.login
        },
        create:{
          ...args,
          password,
          role,
          tunnelPort
        },
        update:{
          ...args,
          password,
          role
        }
      })
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  /**TODO: Modification of any type of user account. Accessible to admins only 
   * tunnelPort can be modified if the role is a host service,
   * but throws an error if it is already being used by another user
  */

  async signin(parent, { login, password }, ctx: Context, info) {
    const user = await ctx.db.query.user({ where: { login } })
    if (!user) {
      throw new Error(`No such user found: ${login}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
}
