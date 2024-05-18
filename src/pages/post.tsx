import { Show, createResource, createSignal, onMount } from 'solid-js'
import { useParams } from '@solidjs/router'

import PostData from '../models/data/post'

import { setDrawerClosed } from '../data/app'
import { user } from '../data/user'

import DefaultLayout from "../layouts/default-layout"

import Loader from '../components/loader'

import dependency from '../dependency'

export default () => {
  onMount(() => {
    setDrawerClosed(true)
  })

  const params = useParams()

  const fetchPost = async () => {
    const data = await dependency.postService?.get(+params.id, user())

    setPost(data)
  }

  const [postResource] = createResource(fetchPost)

  const [post, setPost] = createSignal<PostData | undefined>(undefined)

  return (
    <DefaultLayout>
      <Show when={postResource.loading}>
        <Loader />
      </Show>
      <Show when={!postResource.loading}>
        <div class="main-card">
          <div class="card main-card-body">
            <div class="card-body">
              <div>{post()?.title}</div>
              <hr /><br />
              <div class="card-body-content">
                {post()?.text}
              </div>         
              <br /><hr />
              <div class="card-body-footer">
                <a href="/">
                  <svg viewBox="0 0 16 16">
                    <path 
                      d="
                        M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 
                        .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 
                        0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 
                        0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5
                      "
                    />
                  </svg>
                </a>
              </div>           
            </div>
          </div>
        </div>
      </Show>      
    </DefaultLayout>
  )
}
