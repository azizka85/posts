import UserData from "../models/data/user"
import PostData from "../models/data/post"
import * as postRequest from "../models/request/post"

import PostRepository from "../repository/post"

export default class {
  public constructor(
    private postRepository: PostRepository
  ) {}

  public async list(user?: UserData): Promise<PostData[]> {
    return this.postRepository.list(user)
  }

  public async likedList(user?: UserData): Promise<PostData[]> {
    return this.postRepository.likedList(user)
  }

  public async get(id: number, user?: UserData): Promise<PostData | undefined> {
    return this.postRepository.get(id, user)
  }

  public async create(post: postRequest.Post, user?: UserData): Promise<number | undefined> {
    const data = postRequest.toData(post)
    
    return await this.postRepository.create(data, user)
  }

  public async createLike(postId: number, user: UserData): Promise<boolean> {
    return this.postRepository.createLike(postId, user)
  }

  public async deleteLike(postId: number, user: UserData): Promise<boolean> {
    return this.postRepository.deleteLike(postId, user)
  }
}
