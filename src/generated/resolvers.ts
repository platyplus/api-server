/* DO NOT EDIT! */
import { GraphQLResolveInfo } from 'graphql'

export interface ITypeMap {
  Context: any
  Role: any

  QueryParent: any
  MutationParent: any
  AuthPayloadParent: any
  UserParent: any
  HostParent: any
}

export namespace QueryResolvers {
  export interface ArgsUsers<T extends ITypeMap> {
    login: string | null
  }

  export type UsersResolver<T extends ITypeMap> = (
    parent: T['QueryParent'],
    args: ArgsUsers<T>,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'][] | Promise<T['UserParent'][]>

  export interface ArgsHosts<T extends ITypeMap> {
    hostName: string | null
  }

  export type HostsResolver<T extends ITypeMap> = (
    parent: T['QueryParent'],
    args: ArgsHosts<T>,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['HostParent'][] | Promise<T['HostParent'][]>

  export type MeResolver<T extends ITypeMap> = (
    parent: T['QueryParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'] | null | Promise<T['UserParent'] | null>

  export interface Type<T extends ITypeMap> {
    users: (
      parent: T['QueryParent'],
      args: ArgsUsers<T>,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'][] | Promise<T['UserParent'][]>
    hosts: (
      parent: T['QueryParent'],
      args: ArgsHosts<T>,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['HostParent'][] | Promise<T['HostParent'][]>
    me: (
      parent: T['QueryParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'] | null | Promise<T['UserParent'] | null>
  }
}

export namespace MutationResolvers {
  export interface ArgsSignup<T extends ITypeMap> {
    login: string
    password: string
    name: string
  }

  export type SignupResolver<T extends ITypeMap> = (
    parent: T['MutationParent'],
    args: ArgsSignup<T>,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['AuthPayloadParent'] | Promise<T['AuthPayloadParent']>

  export interface ArgsSignin<T extends ITypeMap> {
    login: string
    password: string
  }

  export type SigninResolver<T extends ITypeMap> = (
    parent: T['MutationParent'],
    args: ArgsSignin<T>,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['AuthPayloadParent'] | Promise<T['AuthPayloadParent']>

  export interface ArgsUpsertHost<T extends ITypeMap> {
    hostName: string
    password: string | null
    publicKey: string | null
    timeZone: string | null
  }

  export type UpsertHostResolver<T extends ITypeMap> = (
    parent: T['MutationParent'],
    args: ArgsUpsertHost<T>,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['HostParent'] | Promise<T['HostParent']>

  export interface ArgsUpsertUser<T extends ITypeMap> {
    login: string
    password: string
    name: string
    role: T['Role'] | null
  }

  export type UpsertUserResolver<T extends ITypeMap> = (
    parent: T['MutationParent'],
    args: ArgsUpsertUser<T>,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['AuthPayloadParent'] | Promise<T['AuthPayloadParent']>

  export interface Type<T extends ITypeMap> {
    signup: (
      parent: T['MutationParent'],
      args: ArgsSignup<T>,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['AuthPayloadParent'] | Promise<T['AuthPayloadParent']>
    signin: (
      parent: T['MutationParent'],
      args: ArgsSignin<T>,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['AuthPayloadParent'] | Promise<T['AuthPayloadParent']>
    upsertHost: (
      parent: T['MutationParent'],
      args: ArgsUpsertHost<T>,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['HostParent'] | Promise<T['HostParent']>
    upsertUser: (
      parent: T['MutationParent'],
      args: ArgsUpsertUser<T>,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['AuthPayloadParent'] | Promise<T['AuthPayloadParent']>
  }
}

export namespace AuthPayloadResolvers {
  export type TokenResolver<T extends ITypeMap> = (
    parent: T['AuthPayloadParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>

  export type UserResolver<T extends ITypeMap> = (
    parent: T['AuthPayloadParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'] | Promise<T['UserParent']>

  export interface Type<T extends ITypeMap> {
    token: (
      parent: T['AuthPayloadParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>
    user: (
      parent: T['AuthPayloadParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'] | Promise<T['UserParent']>
  }
}

export namespace UserResolvers {
  export type IdResolver<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>

  export type LoginResolver<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>

  export type RoleResolver<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['Role'] | Promise<T['Role']>

  export type NameResolver<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>

  export interface Type<T extends ITypeMap> {
    id: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>
    login: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>
    role: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['Role'] | Promise<T['Role']>
    name: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>
  }
}

export namespace HostResolvers {
  export type IdResolver<T extends ITypeMap> = (
    parent: T['HostParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>

  export type HostNameResolver<T extends ITypeMap> = (
    parent: T['HostParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>

  export type OwnerResolver<T extends ITypeMap> = (
    parent: T['HostParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'] | null | Promise<T['UserParent'] | null>

  export type PublicKeyResolver<T extends ITypeMap> = (
    parent: T['HostParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>

  export type TunnelPortResolver<T extends ITypeMap> = (
    parent: T['HostParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => number | null | Promise<number | null>

  export type TimeZoneResolver<T extends ITypeMap> = (
    parent: T['HostParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>

  export interface Type<T extends ITypeMap> {
    id: (
      parent: T['HostParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>
    hostName: (
      parent: T['HostParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>
    owner: (
      parent: T['HostParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'] | null | Promise<T['UserParent'] | null>
    publicKey: (
      parent: T['HostParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | null | Promise<string | null>
    tunnelPort: (
      parent: T['HostParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => number | null | Promise<number | null>
    timeZone: (
      parent: T['HostParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | null | Promise<string | null>
  }
}

export interface IResolvers<T extends ITypeMap> {
  Query: QueryResolvers.Type<T>
  Mutation: MutationResolvers.Type<T>
  AuthPayload: AuthPayloadResolvers.Type<T>
  User: UserResolvers.Type<T>
  Host: HostResolvers.Type<T>
}
