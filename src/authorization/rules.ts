import { rule } from 'graphql-shield'
import { Context } from '../resolvers/types/Context'

export const isAuthenticated = rule()(async (parent, args, ctx:Context, info) => {
    return ctx.user !== null
})

export const isAdmin = rule()(async (parent, args, ctx:Context, info) => {
    return ctx.user && ctx.user.role === 'ADMIN'
})

export const isUser = rule()(async (parent, args, ctx:Context, info) => {
    return ctx.user && ctx.user.role === 'USER'
})
