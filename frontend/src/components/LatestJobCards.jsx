import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate()
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition hover:shadow-2xl" onClick={() => navigate(`/description/${job._id}`)}> 
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-medium text-lg">{job.company.name}</h1>
                <p className="text-sm text-gray-500">{job.company.location}</p>
            </div>

            <div>
                <h1 className="font-bold text-lg my-2">{job.title}</h1>
                <p className="text-sm text-gray-600">{job.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1" variant="ghost">
                    {job.numberOfOpenings} Positions
                </Badge>
                <Badge className="bg-red-100 text-[#F83002] font-semibold text-xs px-2 py-1 capitalize" variant="ghost">
                    {job.jobType}
                </Badge>
                <Badge className="bg-purple-100 text-[#7209b7] font-semibold text-xs px-2 py-1" variant="ghost">
                    ${job.salary}
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
