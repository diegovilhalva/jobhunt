import { Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

import { Avatar, AvatarImage } from "./ui/avatar"
import { useNavigate } from "react-router"


const Job = ({job}) => {
    const navigate = useNavigate()
    
    const formatDate = (date) => {
        const createdAt = new Date(date)
        const currentTime = new Date()

        const timeDifference = currentTime - createdAt

        return Math.floor(timeDifference/(1000*24*60*60))
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{formatDate(job?.createdAt) === 0 ? "Today" : `${formatDate(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>

            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo || "/company-fallback.svg"} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.company?.location}</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1" variant="ghost">
                    {job?.numberOfOpenings} Positions
                </Badge>
                <Badge className="bg-red-100 text-[#F83002] font-semibold text-xs px-2 py-1 capitalize" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="bg-purple-100 text-[#7209b7] font-semibold text-xs px-2 py-1" variant="ghost">
                    ${job?.salary}
                </Badge>
            </div>
               <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline" onClick={() => navigate(`/description/${job?._id}`)} >Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job