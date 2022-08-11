import prisma from "./prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    contact: async (name: string, email: string, subject: string, menssage: string) => {
        const newContact = await prisma.contact.create({
            data: {
                name, email, subject, menssage
            }
        })
        return newContact
    },
}