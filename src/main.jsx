import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min (1).css'
import Recipietore from './redux/Store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={Recipietore}>
    <App />

    </Provider>
    </BrowserRouter>
  
  </StrictMode>,
)