import { useSelector } from "react-redux"
import LatestJobCards from "./LatestJobCards"

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)
   
    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-4xl font-bold mb-6">
                <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {allJobs.map((job) => (
                    <LatestJobCards job={job} key={job._id} />
                ))}
            </div>
        </div>
    )
}

export default LatestJobs
