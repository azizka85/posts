import PostData from "../data/post"

export type Post = {
  title: string
  text?: string
  abstract?: string
}

export function toData(post: Post): PostData {
  return {
    id: 0,
    title: post.title,
    text: post.text,
    abstract: post.abstract,
    liked: false
  }
}
