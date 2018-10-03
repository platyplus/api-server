import { Query } from './Query'
import { Subscription } from './Subscription'
import { auth } from './Mutation/auth'
import { host } from './Mutation/host'
import { post } from './Mutation/post'
import { AuthPayload } from './AuthPayload'

export default {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...host,
  },
  Subscription,
  AuthPayload,
}
