export type Comment = {
    id: number
    body: string
    userId: number
    postId: number
    createdAt?: Date
    User: {
        id: string,
        name: string,
        email: string
        avatar: string
    }


}