import { Search } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="text-center px-4 py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-4 sm:gap-6 max-w-4xl mx-auto">
        {/* Badge */}
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-tighter">
          Search, Apply &<br className="hidden xs:block" />{" "}
          <span className="whitespace-nowrap">
            Get Your <span className="text-[#6A38C2]">Dream Job</span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          Explore thousands of job opportunities, get career advice, and apply with confidence. Your future starts here.
        </p>

        {/* Search Bar */}
        <div className="flex max-w-xl w-full mx-auto shadow-lg border border-gray-200 rounded-full items-center px-3 py-1.5 sm:py-2 sm:px-4">
          <input
            type="text"
            placeholder="Find your dream job"
            aria-label="Search jobs"
            className="flex-grow outline-none border-none bg-transparent px-2 text-xs sm:text-sm md:text-base placeholder-gray-400"
          />
          <Button 
            className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] p-2 sm:p-2.5"
            aria-label="Search button"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;