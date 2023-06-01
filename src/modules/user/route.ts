import { FastifyInstance } from "fastify"
import { registerUser, loginUser, getUsers } from "./controller"
import { $ref } from "./schema"

const userRoutes = async (server: FastifyInstance) => {
  server.post('/', {
    schema: {
      body: $ref('createUserSchema'),
      response: {
        201: $ref('createUserResponseSchema')
      }
    }
  }, registerUser)

  server.post('/login', {
    schema: {
      body: $ref('loginSchema'),
      response: {
        200: $ref('loginResponseSchema')
      }
    }
  }, loginUser)

  server.get('/', {
    preHandler: [server.authenticate],
  }, getUsers)
}


export default userRoutes