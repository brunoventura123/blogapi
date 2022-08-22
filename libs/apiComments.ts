import prisma from "./prisma";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllComments: async (page: number, postId: number) => {
        let take = 3;
        // offset of items
        let skip = 0
        if (page) {
            skip = (page - 1) * take
        }
        const comments = await prisma.comment.findMany({
            take,
            skip,
            where: { postId, },
            select: {
                id: true,
                body: true,
                postId: true,
                createdAt: true,
                userId: true,
                User: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        })
        return comments
    },
    postNewComment: async (body: string, postId: number, userId: number) => {
        const newComment = await prisma.comment.create({
            data: { body, postId, userId }
        })
        return newComment
    },
    updateComment: async (id: number, body: string) => {
        const updateComment = await prisma.comment.update({
            where: {
                id
            },
            data: { body }
        })
        return updateComment
    },
    delComment: async (id: number) => {
        const delComment = await prisma.comment.delete({
            where: { id }
        })
        return delComment
    }

}