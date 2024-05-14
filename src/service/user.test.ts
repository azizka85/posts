import { expect, test } from "vitest"

import SettingsData from "../models/data/settings"
import * as userRequest from "../models/request/user"

import UserRepository from "../repository/mocks/user"

import UserService from "./user"

import { SETTINGS_DISPLAY_EMAIL, SETTINGS_POSTS_PER_PAGE } from "../constants"

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

test('user', async () => {
  const user: userRequest.User = {
    firstName: '__test_1__',
    lastName: '__test_1__',
    email: '__test__@1.again',
    password: '__test_1__'
  }

  const registerUser = await userService.register(user)

  expect(registerUser?.id).greaterThan(0)
  expect(registerUser?.firstName).toBe(user.firstName)
  expect(registerUser?.lastName).toBe(user.lastName)
  expect(registerUser?.email).toBe(user.email)
  expect(registerUser?.sessionCode).not.toBe('')
  
  expect(registerUser?.settings.displayEmail).toBe(SETTINGS_DISPLAY_EMAIL)
  expect(registerUser?.settings.postsPerPage).toBe(SETTINGS_POSTS_PER_PAGE)

  const sessionUser = await userService.get(registerUser!)

  expect(sessionUser?.id).toBe(registerUser?.id)
  expect(sessionUser?.firstName).toBe(registerUser?.firstName)
  expect(sessionUser?.lastName).toBe(registerUser?.lastName)
  expect(sessionUser?.email).toBe(registerUser?.email)
  expect(sessionUser?.sessionCode).toBe(registerUser?.sessionCode)

  expect(sessionUser?.settings.displayEmail).toBe(registerUser?.settings.displayEmail)
  expect(sessionUser?.settings.postsPerPage).toBe(registerUser?.settings.postsPerPage)

  const loginUser = await userService.login(user.email, user.password)

  expect(loginUser?.id).toBe(registerUser?.id)
  expect(loginUser?.firstName).toBe(registerUser?.firstName)
  expect(loginUser?.lastName).toBe(registerUser?.lastName)
  expect(loginUser?.email).toBe(registerUser?.email)
  expect(loginUser?.sessionCode).not.toBe('')

  expect(loginUser?.settings.displayEmail).toBe(registerUser?.settings.displayEmail)
  expect(loginUser?.settings.postsPerPage).toBe(registerUser?.settings.postsPerPage)

  const userSettings: SettingsData = {
    displayEmail: true,
    postsPerPage: 15
  }

  const editResult = await userService.edit
  (
    loginUser!, 
    userSettings
  )

  expect(editResult).toBe(true)

  const sessionUser2 = await userService.get(registerUser!)

  expect(sessionUser2?.email).toBe(user.email)

  expect(sessionUser2?.settings.displayEmail).toBe(userSettings.displayEmail)
  expect(sessionUser2?.settings.postsPerPage).toBe(userSettings.postsPerPage)
})
