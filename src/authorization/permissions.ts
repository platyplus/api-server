import { shield, and, or, not } from 'graphql-shield'
import { isAuthenticated, isAdmin, isUser, ownsHost } from './rules';
export default shield({
    Query: {
      me: isAuthenticated,
      users: isAdmin,
      hosts: isAdmin,
    },
    Mutation: {
      upsertHost: or(isAdmin, ownsHost),
      upsertUser: isAdmin,
    },
    Host: isAuthenticated,
  })