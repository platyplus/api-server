import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    hosts: <T = Host[]>(args: { where?: HostWhereInput, orderBy?: HostOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    host: <T = Host | null>(args: { where: HostWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    hostsConnection: <T = HostConnection>(args: { where?: HostWhereInput, orderBy?: HostOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createHost: <T = Host>(args: { data: HostCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateHost: <T = Host | null>(args: { data: HostUpdateInput, where: HostWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteHost: <T = Host | null>(args: { where: HostWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertHost: <T = Host>(args: { where: HostWhereUniqueInput, create: HostCreateInput, update: HostUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyHosts: <T = BatchPayload>(args: { data: HostUpdateManyInput, where?: HostWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateManyInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyHosts: <T = BatchPayload>(args: { where?: HostWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    host: <T = HostSubscriptionPayload | null>(args: { where?: HostSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  Host: (where?: HostWhereInput) => Promise<boolean>
  User: (where?: UserWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateHost {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Host implements Node {
  id: ID!
  hostName: String!
  password: String!
  publicKey: String
  owner: User
  timeZone: String!
  tunnelPort: Int
}

"""A connection to a list of items."""
type HostConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [HostEdge]!
  aggregate: AggregateHost!
}

input HostCreateInput {
  hostName: String!
  password: String!
  publicKey: String
  timeZone: String
  tunnelPort: Int
  owner: UserCreateOneInput
}

"""An edge in a connection."""
type HostEdge {
  """The item at the end of the edge."""
  node: Host!

  """A cursor for use in pagination."""
  cursor: String!
}

enum HostOrderByInput {
  id_ASC
  id_DESC
  hostName_ASC
  hostName_DESC
  password_ASC
  password_DESC
  publicKey_ASC
  publicKey_DESC
  timeZone_ASC
  timeZone_DESC
  tunnelPort_ASC
  tunnelPort_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type HostPreviousValues {
  id: ID!
  hostName: String!
  password: String!
  publicKey: String
  timeZone: String!
  tunnelPort: Int
}

type HostSubscriptionPayload {
  mutation: MutationType!
  node: Host
  updatedFields: [String!]
  previousValues: HostPreviousValues
}

input HostSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [HostSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [HostSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [HostSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: HostWhereInput
}

input HostUpdateInput {
  hostName: String
  password: String
  publicKey: String
  timeZone: String
  tunnelPort: Int
  owner: UserUpdateOneInput
}

input HostUpdateManyInput {
  hostName: String
  password: String
  publicKey: String
  timeZone: String
  tunnelPort: Int
}

input HostWhereInput {
  """Logical AND on all given filters."""
  AND: [HostWhereInput!]

  """Logical OR on all given filters."""
  OR: [HostWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [HostWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  hostName: String

  """All values that are not equal to given value."""
  hostName_not: String

  """All values that are contained in given list."""
  hostName_in: [String!]

  """All values that are not contained in given list."""
  hostName_not_in: [String!]

  """All values less than the given value."""
  hostName_lt: String

  """All values less than or equal the given value."""
  hostName_lte: String

  """All values greater than the given value."""
  hostName_gt: String

  """All values greater than or equal the given value."""
  hostName_gte: String

  """All values containing the given string."""
  hostName_contains: String

  """All values not containing the given string."""
  hostName_not_contains: String

  """All values starting with the given string."""
  hostName_starts_with: String

  """All values not starting with the given string."""
  hostName_not_starts_with: String

  """All values ending with the given string."""
  hostName_ends_with: String

  """All values not ending with the given string."""
  hostName_not_ends_with: String
  password: String

  """All values that are not equal to given value."""
  password_not: String

  """All values that are contained in given list."""
  password_in: [String!]

  """All values that are not contained in given list."""
  password_not_in: [String!]

  """All values less than the given value."""
  password_lt: String

  """All values less than or equal the given value."""
  password_lte: String

  """All values greater than the given value."""
  password_gt: String

  """All values greater than or equal the given value."""
  password_gte: String

  """All values containing the given string."""
  password_contains: String

  """All values not containing the given string."""
  password_not_contains: String

  """All values starting with the given string."""
  password_starts_with: String

  """All values not starting with the given string."""
  password_not_starts_with: String

  """All values ending with the given string."""
  password_ends_with: String

  """All values not ending with the given string."""
  password_not_ends_with: String
  publicKey: String

  """All values that are not equal to given value."""
  publicKey_not: String

  """All values that are contained in given list."""
  publicKey_in: [String!]

  """All values that are not contained in given list."""
  publicKey_not_in: [String!]

  """All values less than the given value."""
  publicKey_lt: String

  """All values less than or equal the given value."""
  publicKey_lte: String

  """All values greater than the given value."""
  publicKey_gt: String

  """All values greater than or equal the given value."""
  publicKey_gte: String

  """All values containing the given string."""
  publicKey_contains: String

  """All values not containing the given string."""
  publicKey_not_contains: String

  """All values starting with the given string."""
  publicKey_starts_with: String

  """All values not starting with the given string."""
  publicKey_not_starts_with: String

  """All values ending with the given string."""
  publicKey_ends_with: String

  """All values not ending with the given string."""
  publicKey_not_ends_with: String
  timeZone: String

  """All values that are not equal to given value."""
  timeZone_not: String

  """All values that are contained in given list."""
  timeZone_in: [String!]

  """All values that are not contained in given list."""
  timeZone_not_in: [String!]

  """All values less than the given value."""
  timeZone_lt: String

  """All values less than or equal the given value."""
  timeZone_lte: String

  """All values greater than the given value."""
  timeZone_gt: String

  """All values greater than or equal the given value."""
  timeZone_gte: String

  """All values containing the given string."""
  timeZone_contains: String

  """All values not containing the given string."""
  timeZone_not_contains: String

  """All values starting with the given string."""
  timeZone_starts_with: String

  """All values not starting with the given string."""
  timeZone_not_starts_with: String

  """All values ending with the given string."""
  timeZone_ends_with: String

  """All values not ending with the given string."""
  timeZone_not_ends_with: String
  tunnelPort: Int

  """All values that are not equal to given value."""
  tunnelPort_not: Int

  """All values that are contained in given list."""
  tunnelPort_in: [Int!]

  """All values that are not contained in given list."""
  tunnelPort_not_in: [Int!]

  """All values less than the given value."""
  tunnelPort_lt: Int

  """All values less than or equal the given value."""
  tunnelPort_lte: Int

  """All values greater than the given value."""
  tunnelPort_gt: Int

  """All values greater than or equal the given value."""
  tunnelPort_gte: Int
  owner: UserWhereInput
}

input HostWhereUniqueInput {
  id: ID
  hostName: String
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createHost(data: HostCreateInput!): Host!
  createUser(data: UserCreateInput!): User!
  updateHost(data: HostUpdateInput!, where: HostWhereUniqueInput!): Host
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  deleteHost(where: HostWhereUniqueInput!): Host
  deleteUser(where: UserWhereUniqueInput!): User
  upsertHost(where: HostWhereUniqueInput!, create: HostCreateInput!, update: HostUpdateInput!): Host!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  updateManyHosts(data: HostUpdateManyInput!, where: HostWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateManyInput!, where: UserWhereInput): BatchPayload!
  deleteManyHosts(where: HostWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  hosts(where: HostWhereInput, orderBy: HostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Host]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  host(where: HostWhereUniqueInput!): Host
  user(where: UserWhereUniqueInput!): User
  hostsConnection(where: HostWhereInput, orderBy: HostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HostConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

enum Role {
  ADMIN
  USER
}

type Subscription {
  host(where: HostSubscriptionWhereInput): HostSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User implements Node {
  id: ID!
  login: String!
  name: String!
  password: String!
  role: Role
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  login: String!
  name: String!
  password: String!
  role: Role
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  login_ASC
  login_DESC
  name_ASC
  name_DESC
  password_ASC
  password_DESC
  role_ASC
  role_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  login: String!
  name: String!
  password: String!
  role: Role
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateDataInput {
  login: String
  name: String
  password: String
  role: Role
}

input UserUpdateInput {
  login: String
  name: String
  password: String
  role: Role
}

input UserUpdateManyInput {
  login: String
  name: String
  password: String
  role: Role
}

input UserUpdateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  login: String

  """All values that are not equal to given value."""
  login_not: String

  """All values that are contained in given list."""
  login_in: [String!]

  """All values that are not contained in given list."""
  login_not_in: [String!]

  """All values less than the given value."""
  login_lt: String

  """All values less than or equal the given value."""
  login_lte: String

  """All values greater than the given value."""
  login_gt: String

  """All values greater than or equal the given value."""
  login_gte: String

  """All values containing the given string."""
  login_contains: String

  """All values not containing the given string."""
  login_not_contains: String

  """All values starting with the given string."""
  login_starts_with: String

  """All values not starting with the given string."""
  login_not_starts_with: String

  """All values ending with the given string."""
  login_ends_with: String

  """All values not ending with the given string."""
  login_not_ends_with: String
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  password: String

  """All values that are not equal to given value."""
  password_not: String

  """All values that are contained in given list."""
  password_in: [String!]

  """All values that are not contained in given list."""
  password_not_in: [String!]

  """All values less than the given value."""
  password_lt: String

  """All values less than or equal the given value."""
  password_lte: String

  """All values greater than the given value."""
  password_gt: String

  """All values greater than or equal the given value."""
  password_gte: String

  """All values containing the given string."""
  password_contains: String

  """All values not containing the given string."""
  password_not_contains: String

  """All values starting with the given string."""
  password_starts_with: String

  """All values not starting with the given string."""
  password_not_starts_with: String

  """All values ending with the given string."""
  password_ends_with: String

  """All values not ending with the given string."""
  password_not_ends_with: String
  role: Role

  """All values that are not equal to given value."""
  role_not: Role

  """All values that are contained in given list."""
  role_in: [Role!]

  """All values that are not contained in given list."""
  role_not_in: [Role!]
}

input UserWhereUniqueInput {
  id: ID
  login: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type HostOrderByInput =   'id_ASC' |
  'id_DESC' |
  'hostName_ASC' |
  'hostName_DESC' |
  'password_ASC' |
  'password_DESC' |
  'publicKey_ASC' |
  'publicKey_DESC' |
  'timeZone_ASC' |
  'timeZone_DESC' |
  'tunnelPort_ASC' |
  'tunnelPort_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Role =   'ADMIN' |
  'USER'

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'login_ASC' |
  'login_DESC' |
  'name_ASC' |
  'name_DESC' |
  'password_ASC' |
  'password_DESC' |
  'role_ASC' |
  'role_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface HostWhereUniqueInput {
  id?: ID_Input
  hostName?: String
}

export interface HostCreateInput {
  hostName: String
  password: String
  publicKey?: String
  timeZone?: String
  tunnelPort?: Int
  owner?: UserCreateOneInput
}

export interface UserUpdateInput {
  login?: String
  name?: String
  password?: String
  role?: Role
}

export interface HostWhereInput {
  AND?: HostWhereInput[] | HostWhereInput
  OR?: HostWhereInput[] | HostWhereInput
  NOT?: HostWhereInput[] | HostWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  hostName?: String
  hostName_not?: String
  hostName_in?: String[] | String
  hostName_not_in?: String[] | String
  hostName_lt?: String
  hostName_lte?: String
  hostName_gt?: String
  hostName_gte?: String
  hostName_contains?: String
  hostName_not_contains?: String
  hostName_starts_with?: String
  hostName_not_starts_with?: String
  hostName_ends_with?: String
  hostName_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  publicKey?: String
  publicKey_not?: String
  publicKey_in?: String[] | String
  publicKey_not_in?: String[] | String
  publicKey_lt?: String
  publicKey_lte?: String
  publicKey_gt?: String
  publicKey_gte?: String
  publicKey_contains?: String
  publicKey_not_contains?: String
  publicKey_starts_with?: String
  publicKey_not_starts_with?: String
  publicKey_ends_with?: String
  publicKey_not_ends_with?: String
  timeZone?: String
  timeZone_not?: String
  timeZone_in?: String[] | String
  timeZone_not_in?: String[] | String
  timeZone_lt?: String
  timeZone_lte?: String
  timeZone_gt?: String
  timeZone_gte?: String
  timeZone_contains?: String
  timeZone_not_contains?: String
  timeZone_starts_with?: String
  timeZone_not_starts_with?: String
  timeZone_ends_with?: String
  timeZone_not_ends_with?: String
  tunnelPort?: Int
  tunnelPort_not?: Int
  tunnelPort_in?: Int[] | Int
  tunnelPort_not_in?: Int[] | Int
  tunnelPort_lt?: Int
  tunnelPort_lte?: Int
  tunnelPort_gt?: Int
  tunnelPort_gte?: Int
  owner?: UserWhereInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface HostSubscriptionWhereInput {
  AND?: HostSubscriptionWhereInput[] | HostSubscriptionWhereInput
  OR?: HostSubscriptionWhereInput[] | HostSubscriptionWhereInput
  NOT?: HostSubscriptionWhereInput[] | HostSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: HostWhereInput
}

export interface UserUpdateDataInput {
  login?: String
  name?: String
  password?: String
  role?: Role
}

export interface UserUpdateManyInput {
  login?: String
  name?: String
  password?: String
  role?: Role
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface UserCreateInput {
  login: String
  name: String
  password: String
  role?: Role
}

export interface HostUpdateInput {
  hostName?: String
  password?: String
  publicKey?: String
  timeZone?: String
  tunnelPort?: Int
  owner?: UserUpdateOneInput
}

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  login?: String
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  login?: String
  login_not?: String
  login_in?: String[] | String
  login_not_in?: String[] | String
  login_lt?: String
  login_lte?: String
  login_gt?: String
  login_gte?: String
  login_contains?: String
  login_not_contains?: String
  login_starts_with?: String
  login_not_starts_with?: String
  login_ends_with?: String
  login_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  role?: Role
  role_not?: Role
  role_in?: Role[] | Role
  role_not_in?: Role[] | Role
}

export interface HostUpdateManyInput {
  hostName?: String
  password?: String
  publicKey?: String
  timeZone?: String
  tunnelPort?: Int
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface AggregateUser {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface HostConnection {
  pageInfo: PageInfo
  edges: HostEdge[]
  aggregate: AggregateHost
}

export interface HostSubscriptionPayload {
  mutation: MutationType
  node?: Host
  updatedFields?: String[]
  previousValues?: HostPreviousValues
}

export interface BatchPayload {
  count: Long
}

export interface UserPreviousValues {
  id: ID_Output
  login: String
  name: String
  password: String
  role?: Role
}

export interface AggregateHost {
  count: Int
}

export interface HostPreviousValues {
  id: ID_Output
  hostName: String
  password: String
  publicKey?: String
  timeZone: String
  tunnelPort?: Int
}

export interface Host extends Node {
  id: ID_Output
  hostName: String
  password: String
  publicKey?: String
  owner?: User
  timeZone: String
  tunnelPort?: Int
}

export interface User extends Node {
  id: ID_Output
  login: String
  name: String
  password: String
  role?: Role
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface HostEdge {
  node: Host
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number