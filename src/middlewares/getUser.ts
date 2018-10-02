import { getUserId } from "../utils";
import * as jwt from 'jsonwebtoken'

const getUser = async (req, res, next, db) => {
    const Authorization = req.get('Authorization')
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '')
      const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
      if (userId) {
        const user = await db.query.user({ where: { id: userId } })
        if (user) {
          req.user = user
        }
      }
    }
    next()
  }
  
export default getUser