import UserData from "../../models/data/user"
import PostData from "../../models/data/post"

import PostRepository from "../post"

export default class implements PostRepository {
  private posts: Map<number, PostData>
  private likes: {[postId: number]: Set<number>}

  private currentId: number

  public constructor() {
    this.posts = new Map()
    this.likes = {}

    this.currentId = 0
  }

  public async list(user?: UserData): Promise<PostData[]> {
    const result = []
    
    for (const [postId, post] of this.posts.entries()) {
      if (user && this.likes[postId].has(user.id)) {
        post.liked = true
      }

      result.push(post)
    }

    return result
  }

  public async likedList(user?: UserData): Promise<PostData[]> {
    const result = []
    
    for (const [postId, post] of this.posts.entries()) {
      if (user && this.likes[postId].has(user.id)) {
        post.liked = true

        result.push(post)
      }      
    }

    return result
  }

  public async get(id: number, user?: UserData): Promise<PostData | undefined> {
    const post = this.posts.get(id)

    if (post && user && this.likes[id].has(user.id)) {
      post.liked = true
    }

    return post
  }

  public async create(post: PostData, user?: UserData): Promise<number | undefined> {
    this.currentId += 1

    post.id = this.currentId
    post.author = user

    this.posts.set(post.id, post)
    this.likes[post.id] = new Set()    

    return post.id
  }

  public async createLike(postId: number, user: UserData): Promise<boolean> {
    const post = this.posts.get(postId)

    if (!post) {
      return false
    }

    this.likes[post.id].add(user.id)

    return true
  }

  public async deleteLike(postId: number, user: UserData): Promise<boolean> {
    const post = this.posts.get(postId)

    if (!post) {
      return false
    }    

    return this.likes[post.id].delete(user.id)
  }
  
}
