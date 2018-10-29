import * as jwt from 'jsonwebtoken'
import { Context } from '../resolvers/types/Context';
const getUser = async (resolve: any, root: any, args: any, context:Context, info: any) => {
  const auth = context.request.headers.authorization
  if (auth) {
    const token = auth.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET!) as { userId: string }
    if (userId) {
      context.user = await context.db.user({ id: userId })
    }
  }
  return await resolve(root, args, context, info)
}

export default getUser

