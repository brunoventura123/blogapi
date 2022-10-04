import { NextApiHandler } from "next";
import apiUsers from "../../../libs/apiUsers";
import * as bcrypt from 'bcrypt'

const handlerGet: NextApiHandler = async (req, res) => {
    const { email, password } = req.body
    //let hashPassword = await bcrypt.hash(password, 8)
    const user = await apiUsers.getUser(email, password)
    //const hashCompare = await bcrypt.compare(hashPassword, user?.password as string)

    res.json({ status: true, user })
}
const handlerPost: NextApiHandler = async (req, res) => {
    const { name, email, password, avatar } = req.body
    //let hashPassword = await bcrypt.hash(password, 8)
    const newUser = await apiUsers.postUser(name, email, password, avatar)
    res.status(201).json({ status: true, newUser })
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