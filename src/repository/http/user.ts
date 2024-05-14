import Settings from "../../models/data/settings"
import User from "../../models/data/user"

import UserRepository from "../user"
import HttpRepository from "."

export default class extends HttpRepository implements UserRepository {
  public constructor(
    private test: boolean
  ) {
    super()
  }

  public async get(sessionCode: string): Promise<User | undefined> {
    const res = await fetch(
      `${import.meta.env.VITE_POSTS_PATH}/user?test=${this.test}`,
      {
        headers: {
          'session-code': sessionCode
        }
      }
    )

    const data = await res.json()

    return data ? this.read(data) : undefined
  }

  public async login(email: string, password: string): Promise<User | undefined> {
    const res = await fetch(
      `${import.meta.env.VITE_POSTS_PATH}/sign-in?test=${this.test}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({email, password})
      }
    )

    const data = await res.json()

    return data ? this.read(data) : undefined
  }

  public async register(user: User, password: string): Promise<User | undefined> {
    const res = await fetch(
      `${import.meta.env.VITE_POSTS_PATH}/sign-up?test=${this.test}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          password: password
        })
      }
    )

    const data = await res.json()

    return data ? this.read(data) : undefined
  }

  public async edit(user: User, settings: Settings): Promise<boolean> {
    const res = await fetch(
      `${import.meta.env.VITE_POSTS_PATH}/settings/edit?test=${this.test}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=utf-8',
          'session-code': user.sessionCode
        },
        body: JSON.stringify({
          posts_per_page: settings.postsPerPage,
          display_email: settings.displayEmail
        })
      }
    )

    return await res.json()
  }

  private read(data: {[key: string]: any}): User {
    return {
      id: data['id'],
      firstName: data['first_name'],
      lastName: data['last_name'],
      email: data['email'],
      sessionCode: data['session_code'],

      settings: {
        postsPerPage: data['settings']['posts_per_page'],
        displayEmail: data['settings']['display_email']
      }
    }
  }
}
