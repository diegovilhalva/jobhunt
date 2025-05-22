import { createBrowserRouter, RouterProvider } from "react-router"
import Footer from "./components/shared/Footer"
import Navbar from "./components/shared/Navbar"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import SignUp from "./components/auth/SignUp"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  }
])

function App() {


  return (
    <>
      <RouterProvider 
      router={router} />
    </>
  )
}

export default App
