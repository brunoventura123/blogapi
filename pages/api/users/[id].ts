import { NextApiHandler } from "next";
import apiUsers from "../../../libs/apiUsers";
import prisma from '../../../libs/prisma'

const handlerGet: NextApiHandler = async (req, res) => {
    const { email, password } = req.body
    const user = await apiUsers.getUser(email, password)
    res.json({ status: true, user })
}
const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query
    const { name, email, avatar } = req.body
    const updateUser = await prisma.user.update({
        where: { id: parseInt(id as string) }, data: { name, email, avatar }
    })
    if (updateUser) {
        res.json({ status: true, updateUser })
        return
    }
    res.json({ error: 'Não foi possível alterar esse usuário.' })
}
const handlerDel: NextApiHandler = async (req, res) => {
    const { id } = req.query
    const userDel = await prisma.user.delete({ where: { id: parseInt(id as string) } })
    res.json({ status: true })
}

const handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res)
            break
        case 'PUT':
            handlerPut(req, res)
            break
        case 'DELETE':
            handlerDel(req, res)
            break
    }
}
export default handler