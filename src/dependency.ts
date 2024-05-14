import UserService from "./service/user"
import PostService from "./service/post"

type Dependency = {
  userService?: UserService
  postService?: PostService
}

export default { } as Dependency
