import LatestJobCards from "./LatestJobCards"

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]

const LatestJobs = () => {
    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-4xl font-bold mb-6">
                <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {randomJobs.slice(0, 6).map((item, index) => (
                    <LatestJobCards key={index} />
                ))}
            </div>
        </div>
    )
}

export default LatestJobs
