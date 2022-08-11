import { NextApiHandler } from "next";
import apiContact from "../../../libs/apiContact";

const handlerGet: NextApiHandler = async (req, res) => {

}
const handlerPost: NextApiHandler = async (req, res) => {
    const { name, email, subject, menssage } = req.body
    const newContact = await apiContact.contact(name, email, subject, menssage)
    res.status(201).json({ status: true, newContact })
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