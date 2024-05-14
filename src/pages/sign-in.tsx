import { onMount } from 'solid-js'
import { action, redirect, useSubmission } from '@solidjs/router'

import { setDrawerClosed } from '../data/app'
import { setUser } from '../data/user'

import DefaultLayout from "../layouts/default-layout"

import dependency from '../dependency'

export default () => {
  onMount(() => {
    setDrawerClosed(true)
  })  

  const doSubmit = action(async (data: FormData) => {
    const user = await dependency.userService!.login(
      data.get('email') as string, 
      data.get('password') as string
    )

    if (user) {
      setUser(user)

      throw redirect('/')
    }

    return new Error('User not found')
  })  

  const submission = useSubmission(doSubmit)

  return (
    <DefaultLayout>
      <div class="main-card">
        <div class="card main-card-body">
          <div class="card-body">
            <h2 style="text-transform: uppercase; font-weight: lighter;">
              Sign In
            </h2>
            <form action={doSubmit} method="post" class="mb-1">
              <div class="form-item mb-1">
                <label class="form-label">            
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    class="form-control" 
                    placeholder="Email*"
                    required                
                  />          
                  <span>
                    Email*
                  </span>
                </label>          
              </div>
              <div class="form-item mb-1">
                <label class="form-label">
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    class="form-control" 
                    placeholder="Password*"
                    required
                  />
                  <span id="password-label">
                    Password*
                  </span>
                </label>          
              </div>
              <div style="text-align: right;" class="mb-1">
                <a 
                  class="btn btn-light" 
                  href="/sign-up" 
                >
                  Sign Up
                </a>
              </div>
              <div style="text-align: right;">
                <button 
                  disabled={submission.pending}
                  type="submit" 
                  class="btn btn-success"
                >
                  Sign In
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
