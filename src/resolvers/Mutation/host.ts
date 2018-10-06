import { Context, GitHub } from '../../utils'
import { hostname } from 'os';

export const host = {
    /** Create/Update a host. Accessible to admins only
     * Set the tunnel port as a calculated value
    */
    async upsertHost(parent, { hostName, password, publicKey, timeZone }, ctx: Context, info) {
        const tunnelPort = Number(process.env.NIXOS_FIRST_TUNNEL_PORT) + await ctx.db.query.hostsConnection({}, '{ aggregate { count } }').then(res => res.aggregate.count)
        // TODO: get timeZone from http request?
        // TODO: Updates the tunnel public keys file in the repository
        if (publicKey) {
            let tunnelKeysString = await GitHub.getFile(process.env.NIXOS_GITHUB_REPOSITORY, "keys/tunnel")
            let tunnelKeys = tunnelKeysString.split("\n")
            let found = false
            tunnelKeys = tunnelKeys
                .map(key => {
                    if (key.includes(`service@${hostName}`)) {
                        found = true
                        return publicKey
                    } else return key
                })
                .filter(key => key != '')
            let message = `Udpated the public key for service${hostName}`
            if (!found) {
                tunnelKeys.push(publicKey)
                message = `Created the public key for service${hostName}`
            }
            tunnelKeysString = tunnelKeys.join("\n")
            await GitHub.updateFile(process.env.NIXOS_GITHUB_REPOSITORY,
                "keys/tunnel",
                tunnelKeysString,
                message).catch(error => console.log(error))
        }
        return ctx.db.mutation.upsertHost({
            where: {
                hostName
            },
            create: {
                hostName,
                password,
                publicKey,
                timeZone,
                tunnelPort
            },
            update: {
                password,
                publicKey,
                timeZone
            }
        })
    },

}
