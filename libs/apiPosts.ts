
import prisma from "./prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllPosts: async (page: number) => {
        let take = 4;
        let skip = 0
        if (page) { skip = (page - 1) * take }
        const posts = await prisma.post.findMany({
            skip, take,

        })
        return posts
    },
    getUnique: async (id: number, page: number, cat: string, language: string) => {
        const post = await prisma.post.findFirst({
            where: { id, language },

        })
        return post
    },
    getUniqueUpPost: async (title: string) => {
        const post = await prisma.post.findUnique({ where: {} })
        return post
    },
    getPostForCat: async (page: number, qt: number, cat: string | undefined, language: string) => {
        let take = qt;
        let skip = 0
        if (page) { skip = (page - 1) * take }
        const posts = await prisma.post.findMany({
            skip, take, where: { category: cat, language }
        })
        return posts
    },
}