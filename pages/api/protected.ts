import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req })
    if (!session) {
        res.status(401).json({ message: 'Você não tem acesso' })
        return
    }
    res.json({ message: 'Você tem acesso a essa página', session })
}
export default handler