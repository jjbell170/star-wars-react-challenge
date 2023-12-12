import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import { Provider } from 'react-redux'

import '@fontsource/roboto/latin-300.css'
import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-500.css'
import '@fontsource/roboto/latin-700.css'

const rootNode = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

rootNode.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
)
