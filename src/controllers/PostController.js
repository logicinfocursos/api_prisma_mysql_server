import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async create(req, res) {

        try {

            const { content } = req.body
            const { id } = req.params

            const user = await prisma.user.findUnique({ where: { id: Number(id) } })
            console.log('>>> user', user)

            //if (!user) return res.json({ error: 'usuário não encontrado!' })

            const post = await prisma.post.create({
                data: {
                    content,
                    userId: user.id
                },
                include: {
                    author: true
                }
            })

            return res.json(post)

        } catch (error) {

            console.log('error: ', error)

            return res.json({ message: error.message })
        }
    },



    async findAll(req, res) {

        try {
            const posts = await prisma.post.findMany({
                include: {
                    author: true
                }
            })
            return res.json(posts)

        } catch (error) {

            console.log('error: ', error)

            return res.json({ error })
        }
    },



    async find(req, res) {

        try {
            const { id } = req.params
            const post = await prisma.post.findUnique(
                {
                    where: {
                        id: Number(id)
                    },
                
                
                    include: {
                        author: true
                    }
                }
            )

        if (!post) return res.json({ error: 'registro não encontrado!' })

        return res.json(post)

    } catch(error) {

        console.log('error: ', error)

        return res.json({ error })
    }
},


    async update(req, res){

    try {
        const { id } = req.params
        const { content } = req.body

        let post = await prisma.post.findUnique({ where: { id: Number(id) } })

        if (!post) return res.json({ error: 'registro não encontrado!' })

        post = await prisma.post.update({
            where: { id: Number(id) },
            data: { content },
        })

        return res.json(post)

    } catch (error) {

        console.log('error: ', error)

        return res.json({ error })
    }
},


    async delete (req, res){

    try {
        const { id } = req.params
        const post = await prisma.post.findUnique({ where: { id: Number(id) } })

        if (!post) return res.json({ error: 'registro não encontrado!' })

        await prisma.post.delete({ where: { id: Number(id) } })

        return res.json({ message: 'registro deletado com sucesso!' })

    } catch (error) {

        console.log('error: ', error)

        return res.json({ error })
    }
},
}