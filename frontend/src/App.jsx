import { createBrowserRouter, RouterProvider } from "react-router"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import SignUp from "./components/auth/SignUp"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CompanyCreate from "./components/admin/CompanyCreate"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from "./components/admin/PostJob"
import UpdateJob from "./components/admin/UpdateJob"

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
  },
  {
    path: "/admin/companies",
    element: <Companies />

  },
  {
    path: "/admin/companies/create",
    element: <CompanyCreate />
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup />
  },
  {
    path:"/admin/jobs/",
    element:<AdminJobs />
  },
  {
    path:"/admin/jobs/create",
    element:<PostJob />
  },
  {
    path:"/admin/jobs/update/:id",
    element:<UpdateJob />
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
