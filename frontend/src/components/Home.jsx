import { useSelector } from "react-redux"
import usegetAllJobs from "../hooks/usegetAllJobs"
import CategoryCarousel from "./CategoryCarousel"
import HeroSection from "./HeroSection"
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const Home = () => {
  usegetAllJobs()
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies")
    }
  }, [])
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home