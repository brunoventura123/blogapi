import { Photo } from "./photo"

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
    photos: Photo[]
}