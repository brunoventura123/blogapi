import { NextApiHandler } from "next";
import apiComments from "../../../libs/apiComments";

const handlerDel: NextApiHandler = async (req, res) => {
    const { id } = req.query
    const del = await apiComments.delComment(parseInt(id as string))
    res.json({ status: true })
}
const handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            //handlerGet(req, res)
            break
        case 'POST':
            //handlerPost(req, res)
            break
        case 'PUT':
            //handlerPut(req, res)
            break
        case 'DELETE':
            handlerDel(req, res)
            break
    }
}
export default handler