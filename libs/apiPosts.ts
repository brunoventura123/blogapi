
import prisma from "./prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllPosts: async (page: number, take: number) => {

        let skip = 0
        if (page) { skip = (page - 1) * take }
        const posts = await prisma.post.findMany({
            skip, take,

        })
        return posts
    },
    getUnique: async (id: number, page: number, cat: string) => {
        const post = await prisma.post.findFirst({
            where: { id },
            select: {
                id: true,
                title: true,
                titleen: true,
                body: true,
                bodyen: true,
                category: true,
                comment: true,
                createdAt: true,
                photos: true
            }

        })
        return post
    },
    getUniqueUpPost: async (title: string) => {
        const post = await prisma.post.findUnique({ where: {} })
        return post
    },
    getPostForCat: async (page: number, qt: number, cat: string | undefined) => {
        let take = qt;
        let skip = 0
        if (page) { skip = (page - 1) * take }
        const posts = await prisma.post.findMany({
            skip, take, where: { category: cat },
            select: {
                id: true,
                title: true,
                titleen: true,
                body: true,
                bodyen: true,
                category: true,
                createdAt: true,
                comment: true,
                photos: true,
            },
            orderBy: {
                id: 'desc'
            }
        })
        return posts
    },
}