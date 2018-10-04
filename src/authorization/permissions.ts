import { shield, and, or, not } from 'graphql-shield'
import { isAuthenticated, isAdmin, isUser, isOwner } from './rules';
export default shield({
    Query: {
      me: isAuthenticated,
      users: isAdmin,
      hosts: isAdmin,
      host: or(isAdmin, isOwner),
      hostSettings: or(isAdmin, isOwner),
    },
    Mutation: {
      upsertHost: or(isAdmin, isOwner),
      upsertUser: isAdmin,
    },
    Host: isAuthenticated,
  })