import { Show } from 'solid-js'
import { A } from '@solidjs/router'

import { drawerClosed, setDrawerClosed } from '../data/app'
import { user, setUser } from '../data/user'

const signOut = (e: Event) => {
  e.preventDefault()

  setUser(undefined)
}

export default () => 
  <aside 
    class="drawer drawer-hoverable"
    classList={{'drawer-open': !drawerClosed()}}
  >
    <div class="drawer-header">
      <a style="cursor: pointer" onclick={() => setDrawerClosed(true)}>
        <svg  
          class="drawer-header-icon" 
          classList={{'drawer-header-icon-hide': drawerClosed()}}
          viewBox="0 0 16 16"
        >
          <path 
            d="
              M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 
              2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z
            "
          />
        </svg>                       
      </a>
    </div>
    <div class="drawer-content">
      <div class="drawer-account-bar">
        <div class="drawer-account-bar-avatar">             
          <svg 
            class="drawer-account-bar-avatar-icon" 
            viewBox="0 0 16 16"            
          >
            <path 
              d="
                M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 
                0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 
                10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z
              "
            />
          </svg>          
        </div>
        <div class="drawer-account-bar-actions">   
          <Show when={user()}>
            <a 
              style="white-space: nowrap; overflow: hidden;"
            >
              {user()?.firstName} {user()?.lastName}
            </a>
            <Show when={user()?.email}>
              <a 
                style="white-space: nowrap; overflow: hidden;"
              >
                {user()?.email}
              </a>
            </Show>
            <a 
              href='#'
              style="white-space: nowrap; overflow: hidden;"
              onClick={signOut}
            >
              Sign Out
            </a>
          </Show>
          <Show when={!user()}>
            <div class="drawer-account-bar-actions-sign">
              <a href="/sign-in" style="white-space: nowrap; overflow: hidden;">
                Sign In
              </a> 
              <a>&nbsp;/&nbsp;</a>
              <a href="/sign-up" style="white-space: nowrap; overflow: hidden;">
                Sign Up
              </a>
            </div>
          </Show>
        </div>
      </div>      
      <div class="list">
        <A href="/" class="list-item">          
          <svg class="list-item-icon" viewBox="0 0 16 16">
            <path 
              d="
                M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 
                1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 
                0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 
                3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 
                .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 
                0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z
              "
            />
          </svg>
          Home
        </A>
        <A href="/liked-posts" class="list-item" activeClass='list-item-activated'>
          <svg class="list-item-icon" viewBox="0 0 16 16">
            <path 
              d="
                m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 
                3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 
                10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 
                .176-.17C12.72-3.042 23.333 4.867 8 15
              "/>
          </svg>
          Liked Posts
        </A>
        <a href="/create-post" class="list-item">
          <svg class="list-item-icon" viewBox="0 0 16 16">
            <path 
              fill-rule="evenodd" 
              d="
                M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 
                0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 
                0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 
                0 0 1 .154.154l.215.338 7.494-7.494Z
              "
            />
          </svg>
          Create Post
        </a>
        <a href="/settings" class="list-item">          
          <svg class="list-item-icon" viewBox="0 0 16 16">
            <path 
              d="
                M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 
                1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 
                1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 
                1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 
                1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 
                2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 
                1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 
                1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 
                1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z
              "
            />
          </svg>
          Settings
        </a>
      </div>
    </div>
  </aside>  
    
