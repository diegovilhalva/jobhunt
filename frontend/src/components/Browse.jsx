import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect } from "react";
import { setSearchedQuery } from "../redux/jobSlice";
import usegetAllJobs from "../hooks/usegetAllJobs";



const Browse = () => {
  usegetAllJobs()
  const {allJobs} = useSelector(store => store.job)
  const dispatch = useDispatch()
   useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
  return (
    <div>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Search Results ({allJobs.length})
        </h1>

        {allJobs.length === 0 ? (
          <p className="text-gray-600 text-lg">No jobs found. Try adjusting your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job, index) => (
              <Job job={job} key={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
