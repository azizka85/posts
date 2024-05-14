import UserData from "../models/data/user"
import SettingsData from "../models/data/settings"
import * as userRequest from "../models/request/user"

import UserRepository from "../repository/user"

export default class {
  public constructor(
    private userRepository: UserRepository
  ) {}

  public async get(user: UserData): Promise<UserData | undefined> {
    return this.userRepository.get(user.sessionCode)
  }

  public async login(email: string, password: string): Promise<UserData | undefined> {
    return this.userRepository.login(email, password)
  }

  public async register(user: userRequest.User): Promise<UserData | undefined> {
    const data = userRequest.toData(user)    

    return this.userRepository.register(data, user.password)
  }

  public async edit(user: UserData, settings: SettingsData): Promise<boolean> {
    return await this.userRepository.edit(user, settings)
  }
}
