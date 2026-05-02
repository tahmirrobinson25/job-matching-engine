import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'


const rootElement = document.getElementById('root')
console.log("ROOT:", rootElement)
const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
) 
