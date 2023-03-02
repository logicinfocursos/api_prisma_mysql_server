import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async create(req, res) {

        try {

            const { name, email } = req.body

            let user = await prisma.user.findUnique({ where: { email } })

            if (user) return res.json({ error: 'já existe um usuário com esse email!' })

            user = await prisma.user.create(
                {
                    data: {
                        name,
                        email,
                    }
                })

            return res.json(user)

        } catch (error) {

            console.log('error: ', error)

            return res.json({ error })
        }
    },



    async findAll(req, res){

        try {
            const users = await prisma.user.findMany()
            return res.json(users)

        } catch (error) {
            
            console.log('error: ', error)

            return res.json({ error })
        }
    },



    async find(req, res){

        try {
            const { id } = req.params
            const user = await prisma.user.findUnique({where : {id: Number(id)}})

            if(!user) return res.json({ error: 'registro não encontrado!'})

            return res.json(user)

        } catch (error) {
            
            console.log('error: ', error)

            return res.json({ error })
        }
    },


    async update(req, res){

        try {
            const { id } = req.params
            const { name, email } = req.body

            let user = await prisma.user.findUnique({where : {id: Number(id)}})

            if(!user) return res.json({ error: 'registro não encontrado!'})

            user = await prisma.user.update({
                where: { id: Number(id)},
                data: { name, email },
            })
            
            return res.json(user)

        } catch (error) {
            
            console.log('error: ', error)

            return res.json({ error })
        }
    },


    async delete(req, res){

        try {
            const { id } = req.params
            const user = await prisma.user.findUnique({where : {id: Number(id)}})

            if(!user) return res.json({ error: 'registro não encontrado!'})

            await prisma.user.delete({ where: { id:  Number(id)}})

            return res.json({ message: 'registro deletado com sucesso!'})

        } catch (error) {
            
            console.log('error: ', error)

            return res.json({ error })
        }
    },
}