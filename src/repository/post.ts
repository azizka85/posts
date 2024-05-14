import UserData from "../models/data/user"
import PostData from "../models/data/post"

interface Post {
  list(user?: UserData): Promise<PostData[]>

  likedList(user?: UserData): Promise<PostData[]>

  get(id: number, user?: UserData): Promise<PostData | undefined>

  create(post: PostData, user?: UserData): Promise<number | undefined>

  createLike(postId: number, user: UserData): Promise<boolean>

  deleteLike(postId: number, user: UserData): Promise<boolean>
}

export default Post
