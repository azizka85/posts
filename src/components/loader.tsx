import favicon from '../assets/favicon.png'

export default () => 
  <div class="loader">
    <div class="loader-container">
      <img src={favicon} />
      <div class="loader-container-progress"></div>
    </div>
  </div>
