import { createHashRouter, createBrowserRouter } from 'react-router-dom'
import App from './App'
import { LoginPage } from './pages/LoginPage'
import { MainPage } from './pages/MainPage'

const Router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "/login/",
        element: <LoginPage />
      },
    ]
  }
])

export default Router
