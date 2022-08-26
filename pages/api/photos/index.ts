import { NextApiHandler } from "next";
import apiPhotos from '../../../libs/apiPhotos'

const handlerGet: NextApiHandler = async (req, res) => {
    const { postId } = req.query
    const photos = await apiPhotos.getAllPhotos()
    res.json({ status: true, photos })

}
const handlerPost: NextApiHandler = async (req, res) => {
    const { url, token, postId } = req.body
    const newPhoto = await apiPhotos.postPhoto(url as string, token as string, parseInt(postId as string))
    res.json({ status: true, newPhoto })
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