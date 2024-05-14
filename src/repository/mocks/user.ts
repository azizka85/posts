import UserData from "../../models/data/user"
import SettingsData from "../../models/data/settings"

import UserRepository from "../user"

export default class implements UserRepository {
  private users: {[id: number]: UserData}
  private tokens: {[token: string]: UserData}
  private codes: {[code: string]: UserData}

  private currentId: number

  public constructor() {
    this.users = {}
    this.tokens = {}
    this.codes = {}

    this.currentId = 0
  }

  public async get(sessionCode: string): Promise<UserData | undefined> {
    return this.codes[sessionCode]
  }

  public async login(email: string, password: string): Promise<UserData | undefined> {
    const token = `${email}-${password}`

    return this.tokens[token]
  }

  public async register(user: UserData, password: string): Promise<UserData | undefined> {
    this.currentId += 1

    user.id = this.currentId

    this.users[user.id] = user
    
    const token = `${user.email}-${password}`

    this.tokens[token] = user

    const code = `${token}-${user.id}`

    this.codes[code] = user

    user.sessionCode = code

    return user
  }

  public async edit(user: UserData, settings: SettingsData): Promise<boolean> {
    user.settings.postsPerPage = settings.postsPerPage
    user.settings.displayEmail = settings.displayEmail

    return true
  }
}
