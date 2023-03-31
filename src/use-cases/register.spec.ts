import { expect, test, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'


describe('Register Use Case', () => {


    it('should hash user password', async () => {     
        
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email) {
                return null
              },
        
              async create(data) {
                return {
                  id: 'user-1',
                  name: data.name,
                  email: data.email,
                  password_hash: data.password_hash,
                  created_at: new Date(),
                }
              },
        })
      


        const {user} = await registerUseCase.execute({
            name: 'John Doe',
            email: 'josdsd@hotmail.com',
            password: '12345678'
        })

        const isPasswordHashed = await compare('12345678', user.password_hash)
    })
})