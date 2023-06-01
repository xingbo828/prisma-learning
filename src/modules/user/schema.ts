import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const createUserSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'email must be a string'
  }).email(),
  name: z.string({
    required_error: 'Name is required',
  }).min(3).max(255),
  password: z.string({
    required_error: 'Password is required',
  }).min(6).max(255),
})

const createUserResponseSchema = z.object({
  id: z.number(),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'email must be a string'
  }).email(),
  name: z.string({
    required_error: 'Name is required',
  }).min(3).max(255)
})

const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'email must be a string'
  }).email(),
  password: z.string({
    required_error: 'Password is required',
  }).min(6).max(255)
})

const loginResponseSchema = z.object({
  accessToken: z.string()
})

const getUserSchema = z.object({
  accessToken: z.string()
})

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserResponseSchema,
  createUserSchema,
  loginSchema,
  loginResponseSchema
})
export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type GetUserInput = z.infer<typeof getUserSchema>