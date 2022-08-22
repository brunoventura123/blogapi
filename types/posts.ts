export type Post = {
    id: number
    title: string
    titleen: string
    body: string
    bodyen: string
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