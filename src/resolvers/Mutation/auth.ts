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

  /** Creation of any type of user account. Accessible to admins only
   * Automatically calculates the tunnel port if the user being created is a host service
  */
  async createUser(parent, args, ctx: Context, info) {
    const password = await bcrypt.hash(args.password, 10) // TODO why 10?
    // TODO: get timeZone from http request?
    if (args.role === "USER_SERVICE"){
      // TODO: Add the public key to the github repository
      GitHub.getFile(process.env.NIXOS_GITHUB_REPOSITORY, "keys/tunnel")
      // TODO: change count to max as soon as available on prisma
      const res = await ctx.db.query.usersConnection({where: {role:"HOST_SERVICE"}},'{ aggregate { count } }')
      args.tunnelPort = res.aggregate.count + Number(process.env.NIXOS_FIRST_TUNNEL_PORT)
    }
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password },
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
