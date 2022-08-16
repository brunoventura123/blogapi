import { NextApiHandler } from "next";
import apiPosts from "../../../libs/apiPosts";
import prisma from '../../../libs/prisma'

const handlerGet: NextApiHandler = async (req, res) => {
    const { id, page, qt, cat, language } = req.query
    const post = await apiPosts.getUnique(parseInt(id as string), parseInt(page as string), cat as string, language as string)
    res.json({ status: true, post })
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query
    const { title, body, category } = req.body
    const updateUser = await prisma.post.update({
        where: {
            id: parseInt(id as string)
        },
        data: {
            title, body, category
        }
    })
    if (updateUser) {
        res.json({ status: true, updateUser })
        return
    }
    res.json({ error: 'Não foi possível alterar esse post' })

}
const handlerDel: NextApiHandler = async (req, res) => {
    const { id } = req.query
    const postDel = await prisma.post.delete({
        where: {
            id: parseInt(id as string)
        }
    })
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