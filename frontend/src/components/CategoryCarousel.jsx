import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "UI/UX Designer",
  "DevOps Engineer"
];

const CategoryCarousel = () => {
  return (
    <section className="px-4 my-12 md:my-16 lg:my-20">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">
        Popular Categories
      </h2>
      
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent className="-ml-1 py-2">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 px-1.5"
            >
              <Button 
                className="w-full rounded-full  shadow-md
                        border
                          text-xs xs:text-sm sm:text-base 
                          px-2.5 xs:px-3 sm:px-4 
                          py-5 sm:py-6
                          min-w-[120px] xs:min-w-[140px]"
                variant="ghost"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Controls */}
        <CarouselPrevious 
          className="hidden sm:flex  h-8 w-8 sm:h-10 sm:w-10" 
          aria-label="Previous category"
        />
        <CarouselNext 
          className="hidden sm:flex  h-8 w-8 sm:h-10 sm:w-10"
          aria-label="Next category"
        />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel