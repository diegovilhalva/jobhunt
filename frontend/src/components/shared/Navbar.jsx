import { useState } from "react"
import { Link } from "react-router"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut, User2, Menu, X } from "lucide-react"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const user = null
    const dummyUser = {
        name: "John Doe",
        bio: "My bio",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random"
    }

    return (
        <div className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    {/* Logo */}
                    <div className="flex flex-shrink-0 items-center">
                        <Link to="/">
                            <h1 className="text-xl font-bold md:text-2xl">
                                Job <span className="text-[#f83002]">Hunt</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation (hidden em mobile) */}
                    <div className="hidden md:flex md:items-center md:gap-12">
                        <ul className="flex items-center gap-5 font-medium">
                            <li>
                                <Link to="/" className="hover:underline">Home</Link>
                            </li>
                            <li>
                                <Link to="/jobs" className="hover:underline">Jobs</Link>
                            </li>
                            <li>
                                <Link to="/browse" className="hover:underline">Browse</Link>
                            </li>
                        </ul>

                        {user ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={dummyUser.avatar} alt={`${dummyUser.name} avatar`} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div>
                                        <div className="flex gap-2">
                                            <Avatar>
                                                <AvatarImage src={dummyUser.avatar} alt={`${dummyUser.name} avatar`} />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{dummyUser.name}</h4>
                                                <p className="text-sm text-muted-foreground">{dummyUser.bio}</p>
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
                        ) : (
                            <div className="ml-4 flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button (visível apenas em mobile) */}
                    <div className="flex items-center md:hidden">
                        <Button
                            variant="ghost"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (visível apenas quando aberto) */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 pb-3 pt-2">
                        <Link
                            to="/"
                            className="block px-4 py-2 text-base font-medium hover:bg-gray-50"
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            className="block px-4 py-2 text-base font-medium hover:bg-gray-50"
                        >
                            Jobs
                        </Link>
                        <Link
                            to="/browse"
                            className="block px-4 py-2 text-base font-medium hover:bg-gray-50"
                        >
                            Browse
                        </Link>
                    </div>
                    {user ? ( <div className="border-t border-gray-200 pb-3 pt-4 px-4">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage 
                                                src={dummyUser.avatar} 
                                                alt={`${dummyUser.name} avatar`} 
                                            />
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{dummyUser.name}</p>
                                            <p className="text-sm text-muted-foreground">View profile</p>
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-full mx-2" side="bottom" align="start">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-md">
                                            <User2 className="h-4 w-4" />
                                            <span>My Profile</span>
                                        </div>
                                        <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-md text-red-600">
                                            <LogOut className="h-4 w-4" />
                                            <span>Logout</span>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>) : (
                        <div className="border-t border-gray-200 pb-3 pt-4">
                            <div className="flex gap-2 px-4">
                                <Link to="/login" className="w-full">
                                    <Button variant="outline" className="w-full">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup" className="w-full">
                                    <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Navbar