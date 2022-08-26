import { NextApiHandler } from "next";
import apiPhotos from "../../../libs/apiPhotos";
import prisma from '../../../libs/prisma'

const handlerGet: NextApiHandler = async (req, res) => {
    const { postId } = req.query
    const photos = await apiPhotos.getPhotos((parseInt(postId as string)))
    res.json({ status: true, photos })
}
const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query
    const { url } = req.body
    const updatePhoto = await apiPhotos.updatePhoto(parseInt(id as string), url)
    if (updatePhoto) {
        res.json({ status: true, updatePhoto })
        return
    }
    res.json({ error: 'Não foi possível alterar essa foto' })

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