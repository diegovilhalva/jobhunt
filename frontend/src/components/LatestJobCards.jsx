import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = () => {
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition hover:shadow-2xl">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-medium text-lg">Company Name</h1>
                <p className="text-sm text-gray-500">England</p>
            </div>

            <div>
                <h1 className="font-bold text-lg my-2">Job Title</h1>
                <p className="text-sm text-gray-600">Job description lorem ipsum dolor sit amet, consectetur.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1" variant="ghost">
                    5 Positions
                </Badge>
                <Badge className="bg-red-100 text-[#F83002] font-semibold text-xs px-2 py-1" variant="ghost">
                    Full-time
                </Badge>
                <Badge className="bg-purple-100 text-[#7209b7] font-semibold text-xs px-2 py-1" variant="ghost">
                    $40K - $60K
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
