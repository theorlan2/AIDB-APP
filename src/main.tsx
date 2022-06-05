import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './routes'
import './css/main.css'
import { CommandsContext, CommandsProvider } from './context/commandsContexts'
import { CommonsProvider } from './context/commonsContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CommandsProvider>
        <CommonsProvider>
          <App />
        </CommonsProvider>
      </CommandsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
