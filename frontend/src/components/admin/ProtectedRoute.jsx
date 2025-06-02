import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { LoaderCircle } from "lucide-react"
import { Card } from "../ui/card"

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user && user.role !== "recruiter") {
      navigate("/")
    }
  }, [user, navigate])

  if (user.role  !== "recruiter") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="p-6 flex flex-col items-center space-y-4">
          <LoaderCircle className="animate-spin h-8 w-8 text-[#6A38C2]" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
