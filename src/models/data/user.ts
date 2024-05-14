import Settings from "./settings"

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  sessionCode: string
  
  settings: Settings
}

export default User
