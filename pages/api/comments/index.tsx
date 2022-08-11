import { NextApiHandler } from "next";
import apiComments from "../../../libs/apiComments";

const handlerGet: NextApiHandler = async (req, res,) => {
    const { page, postId } = req.query
    // const { postId } = req.body
    const comments = await apiComments.getAllComments(parseInt(page as string), parseInt(postId as string))
    res.json({ status: true, comments })
}
const handlerPost: NextApiHandler = async (req, res) => {
    const { body, postId, userId } = req.body
    const newComment = await apiComments.postNewComment(body, postId, userId)
    res.status(201).json({ status: true, newComment })
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