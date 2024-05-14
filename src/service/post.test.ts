import { expect, test } from "vitest"

import * as userRequest from "../models/request/user"
import * as postRequest from "../models/request/post"

import UserRepository from "../repository/mocks/user"
import PostRepository from "../repository/mocks/post"

import UserService from "../service/user"
import PostService from "../service/post"

const userRepository = new UserRepository()
const postRepository = new PostRepository()

const userService = new UserService(userRepository)
const postService = new PostService(postRepository)

test('post', async () => {
  const user: userRequest.User = {
    firstName: '__test_1__',
    lastName: '__test_1__',
    email: '__test__@1.again',
    password: '__test_1__'
  }

  const registerUser = await userService.register(user)

  expect(registerUser?.id).greaterThan(0)

  const post: postRequest.Post = {
    title: '__title_1__',
    text: '__text_1__',
    abstract: '__abstract_1__'
  }

  const createPostId = await postService.create(post, registerUser)

  expect(createPostId).greaterThan(0)

  const getPost = await postService.get(createPostId!, registerUser)

  expect(getPost?.id).toBe(createPostId)
  expect(getPost?.title).toBe(post.title)
  expect(getPost?.text).toBe(post.text)
  expect(getPost?.abstract).toBe(post.abstract)
  expect(getPost?.liked).toBe(false)
  
  expect(getPost?.author?.firstName).toBe(registerUser?.firstName)
  expect(getPost?.author?.lastName).toBe(registerUser?.lastName)
  expect(getPost?.author?.email).toBe(registerUser?.email)

  const postList = await postService.list(registerUser)

  expect(postList.length).greaterThan(0)

  const searchPostIndex = postList.findIndex(p => p.id === createPostId)

  expect(searchPostIndex).greaterThan(-1)

  const postLikedList = await postService.likedList(registerUser)

  expect(postLikedList.length).equal(0)

  const createLikeResult = await postService.createLike(createPostId!, registerUser!)

  expect(createLikeResult).toBe(true)

  const postLikedList2 = await postService.likedList(registerUser)

  expect(postLikedList2.length).equal(1)

  const searchPostIndex2 = postLikedList2.findIndex(p => p.id === createPostId)

  expect(searchPostIndex2).greaterThan(-1)

  const deleteLikeResult = await postService.deleteLike(createPostId!, registerUser!)

  expect(deleteLikeResult).toBe(true)

  const postLikedList3 = await postService.likedList(registerUser)

  expect(postLikedList3.length).equal(0)
})
