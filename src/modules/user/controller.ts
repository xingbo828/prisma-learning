import { FastifyReply, FastifyRequest } from "fastify"
import { createUser, finderUserByEmail, findUsers } from "./services"
import { CreateUserInput, LoginInput, GetUserInput } from "./schema"
import { verifyPassword } from "../../utils/hash"

export const registerUser = async (request: FastifyRequest<{
  Body: CreateUserInput
}>, reply: FastifyReply) => {
  const body = request.body
  try {
    const user = await createUser(body)
    return reply.code(201).send(user)
  } catch (e) {
    console.error(e)
    return reply.code(500).send(e)
  }
}

export const loginUser = async (request: FastifyRequest<{
  Body: LoginInput
}>, reply: FastifyReply) => {
  const body = request.body
  try {
    const user = await finderUserByEmail(body.email)
    if (!user) {
      return reply.code(401).send({ message: 'Unauthorized' })
    }
    const correctPassword = verifyPassword({
      candidatePassword: body.password,
      hash: user.password,
      salt: user.salt
    })
    if (!correctPassword) {
      return reply.code(401).send({ message: 'Unauthorized' })
    }
    const token = await reply.jwtSign({ id: user.id })
    return { accessToken: token }
  } catch (e) {
    console.error(e)
    return reply.code(401).send({ message: 'Unauthorized' })
  }
}

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const users = await findUsers()
  return users
}


