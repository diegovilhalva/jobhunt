import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router";
import { motion, AnimatePresence, useInView }  from "motion/react";


const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const searchJobHandler = async () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

 
  const badgeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: 0.2
      }
    }
  };

  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  
  const searchVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    tap: { scale: 0.98 }
  };


  const buttonVariants = {
    hover: { 
      scale: 1.05,
      rotate: 5,
      backgroundColor: "#5b30a6"
    },
    tap: { 
      scale: 0.95,
      rotate: -2
    }
  };

  
  const placeholderVariants = {
    initial: { opacity: 0.5 },
    focus: { opacity: 0.8, scale: 1.01 }
  };

  return (
    <section 
      className="text-center px-4 py-8 md:py-12 lg:py-16 overflow-hidden"
      ref={ref}
    >
      <div className="flex flex-col gap-4 sm:gap-6 max-w-4xl mx-auto">
        {/* Badge com animação de entrada */}
        <AnimatePresence>
          {isInView && (
            <motion.span
              className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              No. 1 Job Hunt Website
            </motion.span>
          )}
        </AnimatePresence>

        {/* Heading com animação por palavra */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-tighter"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {"Search, Apply &".split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={titleVariants}
              custom={i}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
          <br className="hidden xs:block" />
          <motion.span 
            className="whitespace-nowrap inline-block"
            variants={titleVariants}
            custom={4}
          >
            Get Your{" "}
            <motion.span 
              className="text-[#6A38C2]"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.05, 1],
                transition: { 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 3 
                }
              }}
            >
              Dream Job
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Description com fade-in */}
        <motion.p
          className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.7, duration: 0.5 } 
          } : {}}
        >
          Explore thousands of job opportunities, get career advice, and apply with confidence. Your future starts here.
        </motion.p>

        {/* Search Bar com interações */}
        <motion.div
          className="flex max-w-xl w-full mx-auto shadow-lg border border-gray-200 rounded-full items-center px-3 py-1.5 sm:py-2 sm:px-4 bg-white"
          variants={searchVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.input
            type="text"
            placeholder="Find your dream job"
            aria-label="Search jobs"
            className="flex-grow outline-none border-none bg-transparent px-2 text-xs sm:text-sm md:text-base placeholder-gray-400"
            onChange={(e) => setQuery(e.target.value)}
            variants={placeholderVariants}
            initial="initial"
            whileFocus="focus"
          />
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] p-2 sm:p-2.5"
              aria-label="Search button"
              onClick={searchJobHandler}
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Elementos decorativos animados */}
      <motion.div
        className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-purple-200 opacity-70"
        initial={{ scale: 0 }}
        animate={isInView ? { 
          scale: 1,
          y: [0, -20, 0],
          transition: { 
            delay: 1, 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }
        } : {}}
      />
      
      <motion.div
        className="absolute top-1/3 right-20 w-6 h-6 rounded-full bg-blue-200 opacity-50"
        initial={{ scale: 0 }}
        animate={isInView ? { 
          scale: 1,
          x: [0, 15, 0],
          transition: { 
            delay: 1.2, 
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }
        } : {}}
      />
    </section>
  );
};

export default HeroSection;