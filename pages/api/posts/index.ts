import { NextApiHandler } from "next";
import prisma from '../../../libs/prisma'
import api from '../../../libs/apiPosts'

const handlerGet: NextApiHandler = async (req, res) => {
    const { page, qt, cat } = req.query
    //const posts = await api.getAllPosts(parseInt(page as string))
    const postForCat = await api.getPostForCat(parseInt(page as string), parseInt(qt as string), cat as string)
    res.json({ status: true, postForCat })
}
const handlerGetUpPost: NextApiHandler = async (req, res) => {
    const { page, qt, cat } = req.query
    const posts = await api.getAllPosts(parseInt(page as string))
    const postForCat = await api.getPostForCat(parseInt(page as string), parseInt(qt as string), cat as string)
    res.json({ status: true, posts, postForCat })
}
const handlerPost: NextApiHandler = async (req, res) => {
    const { title, body, category } = req.body
    const newPost = await prisma.post.create({
        data: { title, body, category }
    })
    res.status(201).json({ status: true, newPost })
}

const handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res)
            break
        case 'POST':
            handlerPost(req, res)
            break

    }
}
export default handler