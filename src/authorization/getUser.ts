import * as jwt from 'jsonwebtoken'
const getUser = async (resolve, root, args, context, info) => {
  const auth = context.request.headers.authorization
  if (auth) {
    const token = auth.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
    if (userId) {
      context.user = await context.db.query.user({ where: { id: userId } })
    }
  }
  return await resolve(root, args, context, info)
}

export default getUser

