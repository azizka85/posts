export default class {
  public async clearTest() {
    await fetch(`${import.meta.env.VITE_POSTS_PATH}/test/clear`)
  }
}
