import Post from "../../models/data/post"
import User from "../../models/data/user"

import PostRepository from "../post"
import HttpRepository from "."

import { SETTINGS_DISPLAY_EMAIL, SETTINGS_POSTS_PER_PAGE } from "../../constants"

export default class extends HttpRepository implements PostRepository {
  public constructor(
    private test: boolean
  ) {
    super()
  }

  public async list(user?: User): Promise<Post[]> {
    const res = await fetch(
      `${import.meta.env.VITE_POSTS_PATH}/?test=${this.test}`,
      {
        headers: {
          'session-code': user?.sessionCode ?? ''
        }
      }
    )

    return (await res.json()).map((item: { [key: string]: any }) => this.read(item))
  }

  public async likedList(user?: User): Promise<Post[]> {
    const res = await fetch(
      `${import.meta.env.VITE_POSTS_PATH}/liked?test=${this.test}`,
      {
        headers: {
          'session-code': user?.sessionCode ?? ''
        }
      }
    )

    return (await res.json()).map((item: { [key: string]: any }) => this.read(item))
  }

  public async get(id: number, user?: User | undefined): Promise<Post | undefined> {
    const res = await fetch(
      `${import.meta.env.VITE_POSTS_PATH}/${id}?test=${this.test}`,
      {
        headers: {
          'session-code': user?.sessionCode ?? ''
        }
      }
    )

    const data = await res.json()

    return data ? this.read(data) : undefined
  }

  public async create(post: Post, user?: User): Promise<number> {
    const res = await fetch(
      `${import.meta.env.VITE_POSTS_PATH}/post/create?test=${this.test}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=utf-8',
          'session-code': user?.sessionCode ?? ''
        },
        body: JSON.stringify({
          title: post.title,
          text: post.text,
          abstract: post.abstract
        })
      }
    )

    return await res.json()
  }

  public async createLike(postId: number, user: User): Promise<boolean> {
    const res = await fetch(
      `${import.meta.env.VITE_POSTS_PATH}/like/create?test=${this.test}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=utf-8',
          'session-code': user?.sessionCode ?? ''
        },
        body: `${postId}`
      }
    )

    return await res.json()
  }

  public async deleteLike(postId: number, user: User): Promise<boolean> {
    const res = await fetch(
      `${import.meta.env.VITE_POSTS_PATH}/like/delete?test=${this.test}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=utf-8',
          'session-code': user?.sessionCode ?? ''
        },
        body: `${postId}`
      }
    )

    return await res.json()
  }  

  private read(data: {[key: string]: any}): Post {
    const post: Post = {
      id: data['id'],
      title: data['title'],
      text: data['text'],
      abstract: data['abstract'],
      liked: data['liked']
    }

    if (data['author']) {
      post.author = {
        id: 0,
        firstName: data['author']['first_name'],
        lastName: data['author']['last_name'],
        email: data['author']['email'],
        sessionCode: '',
        settings: {
          postsPerPage: SETTINGS_POSTS_PER_PAGE,
          displayEmail: SETTINGS_DISPLAY_EMAIL
        }
      }
    }

    return post
  }
}
