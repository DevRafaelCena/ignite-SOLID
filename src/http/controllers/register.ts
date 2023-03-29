import { z } from "zod"
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyRequest , FastifyReply } from "fastify"
import { PrismaUsersRepository } from "../../repositories/prisma-users-repository"

export async function register(request: FastifyRequest, reply: FastifyReply){
    
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1)
    })

    const { email , name , password } = registerBodySchema.parse(request.body)

    try{

        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)

        await registerUseCase.execute({email , name , password})
        
    }catch(err){
        return reply.status(400).send({error: err.message})
    }

    return reply.status(201).send()
}