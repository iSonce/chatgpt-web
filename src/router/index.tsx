import App from '@/App'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/chat" />,
  },
  {
    path: '/chat',
    element: <App />,
  },
  {
    path: '/chat/:conversationId',
    element: <App />,
  },
]

const router = createBrowserRouter(routes)

export default router
