
import prisma from "./prisma";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUser: async (email: string, password: string) => {
        const user = await prisma.user.findFirst({
            where: {
                email, password, active: true
            }
        })
        return user
    },
    postUser: async (name: string, email: string, password: string, avatar: string) => {
        const newName = `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`
        const newUser = await prisma.user.create({
            data: { name, email, password, avatar }
        })
        return newUser
    },
    userDel: async (id: number) => {
        const userDel = await prisma.user.delete({
            where: {
                id
            }
        })
        return userDel
    }
}