import App from '@/App'
import { v4 as uuidv4 } from 'uuid'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/chat" />,
  },
  {
    path: '/chat',
    element: <Navigate to={`/chat/${uuidv4()}`} />,
  },
  {
    path: '/chat/:conversationId',
    element: <App />,
  },
]

const router = createBrowserRouter(routes)

export default router
