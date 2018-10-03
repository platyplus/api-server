import { rule } from 'graphql-shield'

export const isAuthenticated = rule()(async (parent, args, ctx, info) => {
    return ctx.user !== null
})

export const isAdmin = rule()(async (parent, args, ctx, info) => {
    return ctx.user.role === 'ADMIN'
})

export const isUser = rule()(async (parent, args, ctx, info) => {
    return ctx.user.role === 'USER'
})

export const isOwner = rule()(async (parent, args, ctx, info) => {
    return ctx.user.id === args.ownerId
})
