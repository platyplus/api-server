import { shield, and, or, not } from 'graphql-shield'
import { isAuthenticated, isAdmin, isUser, isOwner } from './rules';
export default shield({
    Query: {
      me: isAuthenticated,
      users: and(isAuthenticated, isAdmin),
      hostSettings: and(isAuthenticated, or(isAdmin, isOwner)),
    },
    Mutation: {
      upsertHost: and(isAuthenticated, or(isAdmin, isOwner)),
    },
    Host: isAuthenticated,
  })