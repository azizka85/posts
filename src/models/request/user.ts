import UserData from "../data/user"
import { SETTINGS_DISPLAY_EMAIL, SETTINGS_POSTS_PER_PAGE } from "../../constants"

export type User = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export function toData(user: User): UserData {
  return {
    id: 0,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    sessionCode: '',
    
    settings: {
      displayEmail: SETTINGS_DISPLAY_EMAIL,
      postsPerPage: SETTINGS_POSTS_PER_PAGE
    }
  }
}
