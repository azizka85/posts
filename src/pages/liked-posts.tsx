import { onMount, createSignal, createResource, Show, For } from 'solid-js'

import PostData from '../models/data/post'

import { setDrawerClosed } from '../data/app'
import { user } from '../data/user'

import MainLayout from "../layouts/main-layout"

import Card from '../components/card'
import Loader from '../components/loader'

import dependency from '../dependency'

export default () => {
  onMount(() => {
    setDrawerClosed(true)
  })

  const fetchPosts = async () => {
    const data = await dependency!.postService?.likedList(user())

    setPosts(data)
  }

  const [postsResource] = createResource(fetchPosts)

  const [posts, setPosts] = createSignal<PostData[]>()

  const deleteLike = async (postId: number) => {
    if (user()) {
      setPosts(posts => posts?.map(post => post.id === postId ? {...post, loading: true} : post))

      try {
        const result = await dependency.postService?.deleteLike(postId, user()!)

        if (result) {
          setPosts(posts => posts?.filter(post => post.id !== postId))
        }
      } catch {}

      setPosts(posts => posts?.map(post => post.id === postId ? {...post, loading: false} : post))
    }
  }

  return (
    <MainLayout>
      <Show when={postsResource.loading}>
        <Loader />
      </Show>
      <Show when={!postsResource.loading}>
        <div class="card-list">
          <For each={posts()}>{post => 
            <Card 
              id={post.id} 
              title={post.title} 
              content={post.abstract ?? ''} 
              liked={post.liked} 
              loading={post.loading ?? false}
              deleteLike={deleteLike}
            />
          }</For>
        </div>
      </Show>
    </MainLayout>
  )
}  
