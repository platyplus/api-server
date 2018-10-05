import { rule } from 'graphql-shield'
import { Context } from '../utils'

export const isAuthenticated = rule()(async (parent, args, ctx:Context, info) => {
    return ctx.user !== null
})

export const isAdmin = rule()(async (parent, args, ctx:Context, info) => {
    return ctx.user && ctx.user.role === 'ADMIN'
})

export const isUser = rule()(async (parent, args, ctx:Context, info) => {
    return ctx.user && ctx.user.role === 'USER'
})

export const isService = rule()(async (parent, args, ctx:Context, info) => {
    return ctx.user && ctx.user.role === 'SERVICE'
})

export const ownsHost = rule()(async (parent, args, ctx:Context, info) => {
    console.log(ctx.user)
    if (!ctx.user || ctx.user.role !== 'SERVICE') return false 
    console.log('passed the first')
    const host = await ctx.db.query.host({where: {hostName: args.hostName}},'{ owner { id }}')
    console.log(host)
    return ( host.owner.id === ctx.user.id )
})
