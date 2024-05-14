import { expect, test } from "vitest"

import User from "../../models/data/user"
import Post from "../../models/data/post"

import UserRepository from "./user"
import PostRepository from './post'

import { SETTINGS_DISPLAY_EMAIL, SETTINGS_POSTS_PER_PAGE } from "../../constants"

test('post', async () => {
  const user: User = {
    firstName: '__test_2_first_name__',
    lastName: '__test_2_last_name__',
    email: '__test__@2.again',  
    id: 0,
    sessionCode: '',
    settings: {
      postsPerPage: SETTINGS_POSTS_PER_PAGE,
      displayEmail: SETTINGS_DISPLAY_EMAIL
    }
  }

  const password = 'test'

  const userRepository = new UserRepository(true)

  const registerUser = await userRepository.register(user, password)

  expect(registerUser?.id).greaterThan(0)

  const postRepository = new PostRepository(true)

  const post: Post = {
    id: 0,
    title: '__title_1__',
    text: '__text_1__',
    abstract: '__abstract_1__',
    liked: false,
  }

  const createPostId = await postRepository.create(post, registerUser)

  expect(createPostId).toBeGreaterThan(0)

  const getPost = await postRepository.get(createPostId, registerUser)

  expect(getPost?.id).toBe(createPostId)
  expect(getPost?.title).toBe(post.title)
  expect(getPost?.text).toBe(post.text)
  expect(getPost?.abstract).toBe(post.abstract)
  expect(getPost?.liked).toBe(false)
  
  expect(getPost?.author?.firstName).toBe(registerUser?.firstName)
  expect(getPost?.author?.lastName).toBe(registerUser?.lastName)
  expect(getPost?.author?.email).toBe(registerUser?.email)

  const postsList = await postRepository.list(registerUser)

  expect(postsList.length).toBeGreaterThan(0)

  const searchedList = postsList.filter(item => item.id == createPostId)

  expect(searchedList.length).toBeGreaterThan(0)

  const postLikedList = await postRepository.likedList(registerUser)

  expect(postLikedList.length).equal(0)

  const createLikeResult = await postRepository.createLike(createPostId, registerUser!)

  expect(createLikeResult).toBe(true)

  const postLikedList2 = await postRepository.likedList(registerUser)

  expect(postLikedList2.length).equal(1)

  const searchPostIndex2 = postLikedList2.findIndex(p => p.id === createPostId)

  expect(searchPostIndex2).greaterThan(-1)

  const deleteLikeResult = await postRepository.deleteLike(createPostId, registerUser!)

  expect(deleteLikeResult).toBe(true)

  const postLikedList3 = await postRepository.likedList(registerUser)

  expect(postLikedList3.length).equal(0)
})
