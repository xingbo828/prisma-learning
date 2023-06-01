import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import fjwt from "@fastify/jwt"
import userRoutes from "./modules/user/route"
import { userSchemas } from './modules/user/schema'

const server = Fastify()
server.register(fjwt, {
  secret: 'adfadsfasdfasdfasdf'
})

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any
  }
}
server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify()
  } catch(e) {
    return reply.send(e)
  }
})

server.get('/healthcheck', async (request, reply) => {
  return { status: 'ok' }
})

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema)
  }
  server.register(userRoutes, { prefix: 'api/users' })
  try {
    await server.listen({
      port: 3000,
      host: '0.0.0.0'
    })
    console.log(`Server listening at http://localhost:3000`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()