import UserData from "../models/data/user"
import SettingsData from "../models/data/settings"

interface User {
  get(sessionCode: string): Promise<UserData | undefined>

  login(email: string, password: string): Promise<UserData | undefined>

  register(user: UserData, password: string): Promise<UserData | undefined>

  edit(user: UserData, settings: SettingsData): Promise<boolean>
}

export default User
