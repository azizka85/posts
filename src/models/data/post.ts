import User from "./user"

type Post = {
  id: number
  title: string
  text?: string
  abstract?: string
  liked: boolean
  
  author?: User
}

export default Post
