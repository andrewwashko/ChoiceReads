import { createHashRouter, createBrowserRouter } from 'react-router-dom'
import App from './App'
import { MainPage } from './pages/MainPage'
import { AuthPage } from './pages/AuthPage'

const Router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AuthPage />
      },
      {
        path: "main/",
        element: <MainPage />,
      }
    ]
  }
])

export default Router
