import { z } from "zod"
import { hash } from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { FastifyRequest , FastifyReply } from "fastify"

export async function register(request: FastifyRequest, reply: FastifyReply){
    
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1)
    })

    const { email , name , password } = registerBodySchema.parse(request.body)

    const userAlreadyExists = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(userAlreadyExists){
        return reply.status(400).send({
            error: "User already exists"
        })
    }

    const password_hash = await hash(password, 8)

    await prisma.user.create({
        data: {
            email,
            name,
            password_hash
        }
    })

    return reply.status(201).send()
}