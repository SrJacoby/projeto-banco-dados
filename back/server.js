import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/usuarios', async (req, res) => {
    const {name, email, age} = req.query

    const where = {}

    if(name) where.name = name
    if(email) where.email = email
    if(age) where.age = parseInt(age)

    const users = await prisma.user.findMany({where})

    res.status(200).json(users)
})

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }

        })
            

    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }

        })
            

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
            

    res.status(200).json({message: "Usuário deletado com sucesso."})
})

app.listen(3000)