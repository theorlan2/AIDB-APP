import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
//
import App from './routes'
import './css/main.css'
import { CommandsProvider } from './context/commandsContexts'
import { CommonsProvider } from './context/commonsContext'
import { persistor, store } from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate persistor={persistor} >
        <BrowserRouter>
          <CommandsProvider>
            <CommonsProvider>
              <App />
            </CommonsProvider>
          </CommandsProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
