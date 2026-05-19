import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const params = new URLSearchParams(window.location.search)
const p = params.get('p')
if (p) {
  const q = params.get('q')
  const h = params.get('h')
  params.delete('p')
  params.delete('q')
  params.delete('h')
  const rest = params.toString()
  const search = q ? `?${q}${rest ? `&${rest}` : ''}` : rest ? `?${rest}` : ''
  const hash = h ? `#${h}` : ''
  window.history.replaceState(null, '', `${decodeURIComponent(p)}${search}${hash}`)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
