import React from 'react'
import ReactDOM from 'react-dom/client'
import 'uno.css'
import theme from './theme'
import { ThemeProvider } from '@emotion/react'
import router from './router'
import { RouterProvider } from 'react-router-dom'

import { StoreProvider } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>
)
