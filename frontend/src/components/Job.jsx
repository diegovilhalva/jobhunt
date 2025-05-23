import { Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

import { Avatar, AvatarImage } from "./ui/avatar"


const Job = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>

            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Wordpress_Blue_logo.png/960px-Wordpress_Blue_logo.png"} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
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
               <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job