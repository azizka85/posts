import { onMount } from 'solid-js'
import { action, redirect, useSubmission } from '@solidjs/router'

import { setDrawerClosed } from '../data/app'
import { user, setUser } from '../data/user'

import { hexToRgbA } from '../utils/color'

import DefaultLayout from "../layouts/default-layout"

import dependency from '../dependency'

export default () => {
  let primaryColorInput: HTMLInputElement;

  onMount(() => {
    setDrawerClosed(true)

    const root = document.querySelector(':root')!
    const rs = getComputedStyle(root)

    primaryColorInput.value = rs.getPropertyValue('--posts-primary')
  })

  function changePrimaryColor(val: string) {
    const root = document.querySelector(':root')! as HTMLStyleElement

    root.style.setProperty('--posts-primary', val)
    root.style.setProperty('--posts-text-background-primary', val)
    root.style.setProperty('--posts-opacity-15-primary', hexToRgbA(val, 0.15))    
  }

  const doSubmit = action(async (data: FormData) => {
    if (!user()) {
      return new Error('The settings can be changed only for registered user')
    } 
    
    const result = await dependency.userService!.edit(
      user()!, 
      {
        displayEmail: (data.get('displayEmail') as unknown) as boolean | undefined ?? false,
        postsPerPage: (data.get('postsPerPage') as unknown) as number
      }
    )

    if (result) {
      const data = await dependency.userService!.get(user()!)

      if (data) {
        setUser(data)
  
        throw redirect('/')
      }
    }

    return new Error('Could not edit settings')    
  })  

  const submission = useSubmission(doSubmit)

  return (
    <DefaultLayout>
      <div class="main-card">
        <div class="card main-card-body">
          <div class="card-body">
            <h2 style="text-transform: uppercase; font-weight: lighter;">
              Settings
            </h2>
            <form action={doSubmit} method="post" class="mb-1">
              <div class="form-item mb-1">
                <label 
                  for="posts-per-page" 
                  class="form-label"            
                >
                  <input 
                    value={user()?.settings.postsPerPage}
                    type="number" 
                    name="postsPerPage" 
                    id="posts-per-page" 
                    class="form-control" 
                    placeholder="Posts Per Page*"
                    required
                  />
                  <span>
                    Posts Per Page*
                  </span>            
                </label>          
              </div>
              <div class="form-item mb-1">
                <label 
                  for="display-email" 
                  class="form-label"            
                >
                  <input 
                    checked={user()?.settings.displayEmail}
                    type="checkbox" 
                    name="displayEmail" 
                    id="display-email" 
                    class="form-control" 
                    placeholder="Display Email"
                  />
                  <span>
                    Display Email
                  </span>            
                </label>            
              </div>
              <div class="form-item mb-1">
                <label 
                  for="primary-color" 
                  class="form-label"            
                >
                  <input 
                    ref={primaryColorInput!}
                    value="#b00020"
                    type="color" 
                    name="primaryColor" 
                    id="primary-color" 
                    class="form-control" 
                    placeholder="Primary Color"                       
                    onInput={(e) => changePrimaryColor(e.target.value)}               
                  />
                  <span>
                    Primary Color
                  </span>
                </label>          
              </div>                      
              <div style="text-align: right;">
                <button 
                  disabled={submission.pending}
                  type="submit" 
                  class="btn btn-success"
                >
                  Save
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
  
