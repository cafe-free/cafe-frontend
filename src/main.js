import './style.css'
import { setupCounter } from './counter.js'

const currentTime = new Date(Date.now()).toISOString()

document.querySelector('#app').innerHTML = `
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p>
      current time: ${currentTime}
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
