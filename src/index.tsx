/* @refresh reload */
import { render } from 'solid-js/web'

import { lazy } from 'solid-js'
import { Route, Router } from '@solidjs/router'

import UserHttpRepository from './repository/http/user'
import PostHttpRepository from './repository/http/post'

import UserService from './service/user'
import PostService from './service/post'

import dependency from './dependency'

import './index.css'

const userRepository = new UserHttpRepository(false)
const postRepository = new PostHttpRepository(false)

dependency.userService = new UserService(userRepository)
dependency.postService = new PostService(postRepository)

const Home = lazy(() => import('./pages/home'))
const SignUp = lazy(() => import('./pages/sign-up'))
const SignIn = lazy(() => import('./pages/sign-in'))
const LikedPosts = lazy(() => import('./pages/liked-posts'))
const CreatePost = lazy(() => import('./pages/create-post'))
const Settings = lazy(() => import('./pages/settings'))
const Post = lazy(() => import('./pages/post'))

const splashElem = document.querySelector('.splash');

splashElem?.classList.remove('splash-open')

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}

render(() => 
  <Router>
    <Route path="/" component={Home} />
    <Route path="/sign-in" component={SignIn} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/liked-posts" component={LikedPosts} />
    <Route path="/create-post" component={CreatePost} />
    <Route path="/settings" component={Settings} />
    <Route path="/:id" component={Post} />
  </Router>, 
  root!
)
