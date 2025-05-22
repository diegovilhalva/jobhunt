import { Link } from "react-router"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut, User2 } from "lucide-react"

const Navbar = () => {
    // Placeholder para futura role-based UI (ex: const { user } = useSelector(...))
    const user = {
        name: "John Doe",
        bio: "My bio",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random"
    }

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
                <a href="/">
                    <h1 className="text-2xl font-bold">
                        Job <span className="text-[#f83002]">Hunt</span>
                    </h1>
                </a>

                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/jobs" className="hover:underline">Jobs</a></li>
                        <li><a href="/browse" className="hover:underline">Browse</a></li>
                    </ul>

                   
                    {/* <div className="flex items-center gap-2">
                        <Button variant="outline">Login</Button>
                        <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
                    </div> */}

                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={user.avatar} alt={`${user.name} avatar`} />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div>
                                <div className="flex gap-2">
                                    <Avatar>
                                        <AvatarImage src={user.avatar} alt={`${user.name} avatar`} />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">{user.name}</h4>
                                        <p className="text-sm text-muted-foreground">{user.bio}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-4 text-gray-600">
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <User2 />
                                        <Button variant="link" className="p-0 h-auto outline-none">
                                            View Profile
                                        </Button>
                                    </div>
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <LogOut />
                                        <Button variant="link" className="p-0 h-auto">
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Navbar
