import { createBrowserRouter, RouterProvider } from "react-router"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import SignUp from "./components/auth/SignUp"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"

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
  , {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />

  },
  {
    path: "/description/:id",
    element: <JobDescription />
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
