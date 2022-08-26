
import prisma from "./prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllPhotos: async () => {
        const photos = await prisma.photo.findMany()
        return photos
    },
    getPhotos: async (postId: number) => {

        const photos = await prisma.photo.findMany({
            where: {
                postId
            }
        })
        return photos
    },
    postPhoto: async (url: string, token: string, postId: number) => {
        const newPhoto = await prisma.photo.create({
            data: { url, token, postId }
        })
        return newPhoto
    },
    delPhoto: async (id: number) => {
        const photoDel = await prisma.photo.delete({
            where: {
                id
            }
        })
        return photoDel
    },
    updatePhoto: async (id: number, url: string) => {
        const upPhoto = await prisma.photo.update({
            where: {
                id,

            },
            data: {
                url
            }

        })
        return upPhoto
    }
}