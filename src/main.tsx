import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'uno.css'
import theme from './theme'
import { ThemeProvider } from '@emotion/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
