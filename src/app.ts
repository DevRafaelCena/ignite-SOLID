import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const app = fastify()


prisma.user.create({
    data: {
        name: 'Alice',
        email: 'rafael.cena@hotmail.com'
    }
})
