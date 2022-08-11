export type Post = {
    id: number
    title: string
    body: string
    category: string
    createdAt: Date
    comments: {
        name: string
        avatar: string
        userId: number
        postId: number

    }
    photo: {
        id: number
        url: string
    }
}