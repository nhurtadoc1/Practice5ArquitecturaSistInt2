import {OptionalId, ObjectId} from "mongodb"

export type User = {
    id: string,
    name: string,
    password: string,
    email: string,
    posts: Post[],
    comments: Comment[],
    likedPosts: Post[],
}

export type CreateUserInput = {
    name: string,
    password: string,
    email: string,
}
  
export type UpdateUserInput = {
    name: string,
    password: string,
    email: string,
}

export type Post = {
    id: string,
    content: string,
    author: User,
    comments: Comment[],
    likes: User[],
}

export type CreatePostInput = {
    content: string,
    author: User,
}
  
export type UpdatePostInput = {
    content: string,
}

export type Comment = {
    id: string,
    text: string,
    author: User,
    post: Post,
}

export type CreateCommentInput = {
    text: string,
    author: User,
    post: Post,
}
  
export type UpdateCommentInput = {
    text: string,
}