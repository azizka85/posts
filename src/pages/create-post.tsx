import { onMount } from 'solid-js'
import { action, redirect, useSubmission } from '@solidjs/router'

import { setDrawerClosed } from '../data/app'
import { user } from '../data/user'

import DefaultLayout from "../layouts/default-layout"

import dependency from '../dependency'

export default () => {
  onMount(() => {
    setDrawerClosed(true)
  })  

  const doSubmit = action(async (data: FormData) => {
    const postId = await dependency.postService!.create(
      {
        title: data.get('title') as string,
        abstract: data.get('abstract') as string,
        text: data.get('text') as string
      }, 
      user()
    )
  
    if (postId) {
      throw redirect('/')
    }
  
    return new Error('Could not create post')
  })  
  
  const submission = useSubmission(doSubmit)

  return (
    <DefaultLayout>
      <div class="main-card">
        <div class="card main-card-body">
          <div class="card-body">
            <h2 style="text-transform: uppercase; font-weight: lighter;">
              Create Post
            </h2>
            <form action={doSubmit} method="post" class="mb-1">
              <div class="form-item mb-1">
                <label 
                  for="title" 
                  class="form-label"            
                >
                  <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    class="form-control" 
                    placeholder="Title*"
                    required
                  />
                  <span>
                    Title*
                  </span>            
                </label>          
              </div>
              <div class="form-item mb-1">
                <label 
                  for="abstract" 
                  class="form-label"
                >
                  <textarea 
                    name="abstract" 
                    id="abstract" 
                    class="form-control" 
                    placeholder="Abstract"
                    rows="3"
                  ></textarea>
                  <span class="text-3">
                    Abstract
                  </span>
                </label>          
              </div>
              <div class="form-item mb-1">
                <label 
                  for="text" 
                  class="form-label"            
                >
                  <textarea 
                    name="text" 
                    id="text" 
                    class="form-control" 
                    placeholder="Text"
                    rows="6"
                  ></textarea>
                  <span class="text-6">
                    Text
                  </span>
                </label>          
              </div>                    
              <div style="text-align: right;">
                <button 
                  disabled={submission.pending}
                  type="submit" 
                  class="btn btn-success"
                >
                  Create
                </button>
                &nbsp;
                <a 
                  class="btn btn-danger" 
                  href="/"
                >
                  Cancel
                </a>
              </div>
            </form>        
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
  
