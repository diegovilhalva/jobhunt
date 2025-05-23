import CategoryCarousel from "./CategoryCarousel"
import HeroSection from "./HeroSection"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"

const Home = () => {
  return (
    <div>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <Footer />
    </div>
  )
}

export default Home