import { drawerClosed, setDrawerClosed } from '../data/app'

export default () => 
  <header class="app-bar">
    <div class="app-bar-row">            
      <div class="app-bar-section app-bar-section-align-start">
        <a style="cursor: pointer" onclick={() => setDrawerClosed(!drawerClosed())}>
          <svg class="app-bar-icon" viewBox="0 0 16 16">
            <path 
              fill-rule="evenodd" 
              d="
                M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 
                .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 
                0 1H3a.5.5 0 0 1-.5-.5z
              "
            />
          </svg>          
        </a>
      </div>      
    </div>
  </header>    
