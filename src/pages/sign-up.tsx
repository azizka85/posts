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
    const fullName = data.get('fullName')?.toString().split(' ').filter(item => item !== '')

    const user = await dependency.userService!.register({
      email: data.get('email') as string, 
      firstName: fullName![0],
      lastName: fullName![1],
      password: data.get('password') as string
    })

    if (user) {
      setUser(user)

      throw redirect('/')
    }

    return new Error('User with this email already exist')
  })  

  const submission = useSubmission(doSubmit)

  return (
    <DefaultLayout>
      <div class="main-card">
        <div class="card main-card-body">
          <div class="card-body">
            <h2 style="text-transform: uppercase; font-weight: lighter;">
              Sign Up
            </h2>
            <form action={doSubmit} method="post" class="mb-1">
              <div class="form-item mb-1">
                <label 
                  for="full-name" 
                  class="form-label"            
                >
                  <input 
                    type="text" 
                    name="fullName" 
                    id="full-name" 
                    class="form-control" 
                    placeholder="Name*"
                    required
                  />
                  <span>
                    Name*
                  </span>            
                </label>          
              </div>
              <div class="form-item mb-1">
                <label 
                  for="email" 
                  class="form-label"
                >
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
                <label 
                  for="password" 
                  class="form-label"            
                >
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    class="form-control" 
                    placeholder="Password*"
                    required
                  />
                  <span 
                    id="password-label"
                  >
                    Password* 
                  </span>
                </label>          
              </div>          
              <div style="text-align: right;" class="mb-1">
                <a 
                  class="btn btn-light" 
                  href="/sign-in"
                >
                  Sign In 
                </a>
              </div>
              <div style="text-align: right;">
                <button 
                  disabled={submission.pending}
                  type="submit" 
                  class="btn btn-success"
                >
                  Sign Up
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
