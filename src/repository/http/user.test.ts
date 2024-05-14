import { expect, test } from "vitest"

import User from "../../models/data/user"
import Settings from "../../models/data/settings"

import UserRepository from "./user"

import { SETTINGS_DISPLAY_EMAIL, SETTINGS_POSTS_PER_PAGE } from "../../constants"

test('user', async () => {
  const user: User = {
    firstName: '__test_1_first_name__',
    lastName: '__test_1_last_name__',
    email: '__test__@1.again',  
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
  expect(registerUser?.firstName).toBe(user.firstName)
  expect(registerUser?.lastName).toBe(user.lastName)
  
  if (SETTINGS_DISPLAY_EMAIL) {
    expect(registerUser?.email).toBe(user.email)
  } else {
    expect(registerUser?.email).toBeNull()
  }

  expect(registerUser?.sessionCode).not.toBe('')
  
  expect(registerUser?.settings.displayEmail).toBe(SETTINGS_DISPLAY_EMAIL)
  expect(registerUser?.settings.postsPerPage).toBe(SETTINGS_POSTS_PER_PAGE)
  
  const sessionUser = await userRepository.get(registerUser!.sessionCode)

  expect(sessionUser?.id).toBe(registerUser?.id)
  expect(sessionUser?.firstName).toBe(registerUser?.firstName)
  expect(sessionUser?.lastName).toBe(registerUser?.lastName)
  expect(sessionUser?.email).toBe(registerUser?.email)
  expect(sessionUser?.sessionCode).toBe(registerUser?.sessionCode)

  expect(sessionUser?.settings.displayEmail).toBe(registerUser?.settings.displayEmail)
  expect(sessionUser?.settings.postsPerPage).toBe(registerUser?.settings.postsPerPage)

  const loginUser = await userRepository.login(user.email, password)

  expect(loginUser?.id).toBe(registerUser?.id)
  expect(loginUser?.firstName).toBe(registerUser?.firstName)
  expect(loginUser?.lastName).toBe(registerUser?.lastName)
  expect(loginUser?.email).toBe(registerUser?.email)
  expect(loginUser?.sessionCode).not.toBe('')

  expect(loginUser?.settings.displayEmail).toBe(registerUser?.settings.displayEmail)
  expect(loginUser?.settings.postsPerPage).toBe(registerUser?.settings.postsPerPage)

  const userSettings: Settings = {
    displayEmail: true,
    postsPerPage: 15
  }

  const editResult = await userRepository.edit(loginUser!, userSettings)

  expect(editResult).toBe(true)

  const sessionUser2 = await userRepository.get(loginUser!.sessionCode)

  expect(sessionUser2?.email).toBe(user.email)

  expect(sessionUser2?.settings.displayEmail).toBe(userSettings.displayEmail)
  expect(sessionUser2?.settings.postsPerPage).toBe(userSettings.postsPerPage)
})
