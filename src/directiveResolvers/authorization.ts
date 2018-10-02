import * as _ from "lodash";

export const authorization = {
    hasRole: (next, source, {roles}, ctx) => {
        const user = _.get(ctx, 'request.user')
        if (!user) throw new Error(`Not logged in`)
        if (roles.includes(user.role)) {
            return next()
        }
        throw new Error(`Unauthorized, incorrect role`)
    },
}
